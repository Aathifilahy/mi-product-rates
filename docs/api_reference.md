# API reference

Base URL: `/api/mi-product-rates/`

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/` | List rates; supports `search` and `ordering` |
| POST | `/` | Create a rate, including multipart attachment |
| GET | `/{id}/` | Retrieve one rate |
| PATCH | `/{id}/` | Update a rate |
| DELETE | `/{id}/` | Delete a rate |

Rate fields are `service`, `executive_level`, `rate`, `currency`, `status`, and optional `attachment`. Status values are `active` and `inactive`.
