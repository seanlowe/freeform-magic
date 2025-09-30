import { useEffect } from 'react'

type ShortcutHandler = ( event: KeyboardEvent ) => void;

export const useShortcut = (
  key: string,
  handler: ShortcutHandler,
  options?: { ctrl?: boolean; shift?: boolean; alt?: boolean; meta?: boolean }
) => {
  useEffect(() => {
    const listener = ( event: KeyboardEvent ) => {
      const { ctrl, shift, alt, meta } = options || {}

      if (
        event.key.toLowerCase() === key.toLowerCase() &&
        ( !!ctrl === event.ctrlKey ) &&
        ( !!shift === event.shiftKey ) &&
        ( !!alt === event.altKey ) &&
        ( !!meta === event.metaKey )
      ) {
        event.preventDefault()
        handler( event )
      }
    }

    window.addEventListener( 'keydown', listener )

    return () => {
      return window.removeEventListener( 'keydown', listener ) 
    }
  }, [ key, handler, options ] )
}
