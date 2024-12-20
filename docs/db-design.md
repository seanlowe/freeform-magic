# Database Design

Tables:
- Users
- Characters
- Spells

## Users

| Column Name  | Data Type | Description |
| ------------ | --------- | ----------- |
| username     | string    |             |
| firstname    | string    |             |
| lastname     | string    |             |
| role         | string    |             |
| characterIds | integer[] |             |

## Characters

| Column Name   | Data Type | Description |
| ------------- | --------- | ----------- |
| id            | integer   |             |
| name          | string    |             |
| stats         | object    |             |
| proficiencies | object    |             |

## Spells

| Column Name | Data Type | Description |
| ----------- | --------- | ----------- |
| name        | string    |             |
| description | string    |             |
