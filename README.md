Области хранения данных:
	- БД на json-server
	- BFF (backend for frontend)
	- redux store

Сущности приложения:
	- Пользователь: БД (список пользователей), BFF (сессия текущего), redux store (отбражение в браузере)
	- Роль пользователя: БД (список ролей), BFF (сессия пользователя), redux store (использование на клиенте)
	- Статья: БД (список статей), store (отображение в браузере)
	- Комментарий: БД (список комментариев), store (отображение в браузере)

Таблицы БД:
	- пользователи - users: id / login / password / registered_at / role_id
	- роли - roles: id / name
	- статьи - posts: id / title / image_url / content / published_at
	- комментарии - comments: id / author_id / post_id / content

Схема состояния  на BFF:
	- сессия текущего пользователя: login / password / role_id

Схема для redux store (на клиенте):
	- user: id / login / roleId / session
	- posts: массив post: id / title / imageUrl / publishedAt / commentsCount
	- post: id / title / imageUrl / publishedAt / content / comments: массив comment: id / author / content / publishedAt
	- users: массив user: id / login / registeredAt / role
