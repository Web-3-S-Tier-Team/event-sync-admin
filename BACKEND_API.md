# Backend API Contract

This document describes the REST endpoints that `dataProvider` and
`authProvider` expect from the backend. It is intended for the backend
team (Spring Boot / POJA project).

## 1. Authentication

### POST /auth/login

Request body:
```json
{ "email": "alice@company.com", "password": "secret" }
```

Response `200 OK`:
```json
{ "token": "<JWT>" }
```

The JWT **must** encode at least:
```json
{
  "sub": "<user id>",
  "email": "alice@company.com",
  "role": "admin | manager | user",
  "exp": 1718000000
}
```

Response `401 Unauthorized` if credentials are invalid. Do **not** leak
whether the email or the password was wrong (return a generic message).

### Security requirements — password handling (backend side)

- Passwords must **never** be stored in plain text.
- Hash passwords with **BCrypt** (or Argon2) with a per-user salt before
  persisting them, e.g. in Spring Security:
  ```java
  @Bean
  public PasswordEncoder passwordEncoder() {
      return new BCryptPasswordEncoder();
  }
  ```
- The `password` (and `passwordHash`) field must **never** be included in
  any JSON response, including:
  - `GET /users`
  - `GET /users/:id`
  - `POST /users`
  - `PUT /users/:id`

  This must be enforced with `@JsonIgnore` on the entity field, or by using
  a dedicated DTO/response projection that omits the field entirely:
  ```java
  public class UserResponseDto {
      private Long id;
      private String email;
      private String role;
      // no password field at all
  }
  ```
- Every protected endpoint must validate the `Authorization: Bearer <JWT>`
  header and return `401` if missing/invalid/expired, `403` if the role
  doesn't have permission.

## 2. Resources (CRUD)

All resources follow the same convention, consumed by `dataProvider.ts`:

| Operation         | Method & path                                  | Notes |
|--------------------|------------------------------------------------|-------|
| List               | `GET /{resource}?_sort=&_order=&_start=&_end=` | Response header `X-Total-Count` with the total row count |
| Get one            | `GET /{resource}/:id`                          | |
| Get many           | `GET /{resource}?id=1&id=2`                    | |
| Get many reference | `GET /{resource}?{target}={id}&_start=&_end=`  | `X-Total-Count` required |
| Create             | `POST /{resource}`                             | Returns created entity (with generated `id`) |
| Update             | `PUT /{resource}/:id`                          | Returns updated entity |
| Delete             | `DELETE /{resource}/:id`                       | |

### Resources used by this app

- `events` — fields: `id, title, description, location, organizer, category, date, capacity, registeredCount, status, image, createdAt, updatedAt`
  - `category` is one of: `Conférence, Concert, Sport, Formation, Networking, Culturel, Autre`
  - `status` is one of: `upcoming, ongoing, completed, cancelled`

### CORS

The backend must allow:
- Origin: the frontend dev/prod origin
- Headers: `Authorization, Content-Type`
- Expose header: `X-Total-Count` (required for pagination — `Access-Control-Expose-Headers`)

## 3. Business rules

- `capacity` must be `>= 1`.
- `registeredCount` must be `>= 0` and should not exceed `capacity`; the
  backend should reject (`400`) create/update requests that violate this.
- `date` must be a valid ISO 8601 datetime.
- Deleting an event that already has `registeredCount > 0` should be
  rejected (`409 Conflict`) or require confirmation, depending on business
  decision — **to be confirmed with the backend team**.

## 4. Roles & permissions (frontend expectations)

`authProvider.getPermissions()` returns the `role` claim from the JWT:

| Role      | Permissions in the UI |
|-----------|------------------------|
| `admin`   | Full CRUD on events, can edit/delete |
| `manager` | Read events, can edit, cannot delete |
| `user`    | Read-only access to lists and show views |

The frontend hides/disables actions based on this role; the backend **must
also enforce** these rules server-side (the frontend check is UX only, not
a security boundary).
