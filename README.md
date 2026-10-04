# FitTracker Pro

FitTracker Pro 是一个面向健身爱好者、教练和健身房管理员的运动健身管理系统，覆盖训练计划、饮食追踪、身体数据和会员运营。

## 项目主要功能

- 健身仪表盘：今日训练完成率、本周热量均值、最新体重、会员等级与积分。
- 训练计划：计划状态分组、训练日历、动作表、启动/暂停/完成状态流转。
- 饮食日记：日期选择、四餐分区、食物库快速添加、营养合计、热量目标进度。
- 身体数据：体重、体脂、肌肉量、BMI 趋势图，目标追踪和当天覆盖更新。
- 会员管理：管理员可见的会员列表、等级/积分管理、积分规则展示。
- RBAC：User、Coach、Admin 三类角色，前端路由守卫和后端 JWT/角色中间件。
- 统一异常：后端 AppError + error handler，前端 Axios 拦截器统一 toast。
- 审计日志：训练、饮食、身体、会员关键写操作通过 auditMiddleware 记录。

## 快速启动

```bash
docker compose up -d
```

访问地址：

- 前端：http://localhost:38202
- 后端健康检查：http://localhost:38302/api/v1/health
- PostgreSQL：localhost:5432

验证账号：

| 角色 | 账号 | 密码 |
|---|---|---|
| Admin | admin | admin123 |
| Coach | coach | coach123 |
| User | user1 | user123 |
| User | user2 | user123 |

## 本地开发方式

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

本地开发时前端 Vite 代理 `/api` 到 `http://localhost:38302`，前端代码不硬编码 `localhost` API 地址。

## 技术栈

| 层 | 技术 |
|---|---|
| 前端 | React 18、TypeScript、Vite、Ant Design、Zustand、ECharts、React Router |
| 后端 | Node.js、Express、TypeScript、JWT、Zod、bcryptjs |
| 数据 | Prisma Schema、PostgreSQL、内置模拟数据运行态 |
| 部署 | Docker Compose、Nginx、PostgreSQL 16 |

## 项目目录结构

```text
.
├── backend/
│   ├── prisma/schema.prisma
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       ├── middlewares/
│       ├── constants/
│       └── index.ts
├── database/
│   ├── migrations/
│   └── seeds/seed.ts
├── frontend/
│   ├── nginx.conf
│   └── src/
│       ├── api/
│       ├── stores/
│       ├── types/
│       ├── constants/
│       ├── components/common/
│       ├── hooks/
│       ├── pages/
│       ├── router/
│       └── layouts/
├── docker-compose.yml
├── .env
├── .env.example
└── README.md
```

## 环境变量说明

`.env.example` 完整内容：

```env
# Compose 项目名（确保中文目录下正常启动）
COMPOSE_PROJECT_NAME=wjefit

# 前端端口
FRONTEND_PORT=38202

# 后端端口
BACKEND_PORT=38302

# 数据库配置（PostgreSQL）
DB_NAME=fittracker
DB_USER=wjefit
DB_PASSWORD=wjefit123456
DB_PORT=5432

# JWT 配置
JWT_SECRET=your-jwt-secret-key-change-in-production
JWT_EXPIRES_IN=7d
```

## Docker 部署说明

- `docker-compose.yml` 未声明废弃的 `version` 字段。
- 顶层 `name: wjefit`，并通过 `.env` 设置 `COMPOSE_PROJECT_NAME=wjefit`，可在中文目录名下稳定启动。
- 服务包含 `db`、`backend`、`frontend`，容器名带 `${COMPOSE_PROJECT_NAME:-wjefit}` 前缀。
- 数据库使用命名卷 `wjefit-db-data`，不绑定中文路径。
- 前端 Nginx 将 `/api` 反向代理到 `backend:38302`。
- db 和 backend 都配置 healthcheck，backend 等待 db 健康，frontend 等待 backend 健康。

## 枚举出现位置清单

### MealType

| 位置 | 文件路径 |
|------|---------|
| 后端枚举定义 | backend/src/constants/enums.ts |
| Prisma Schema | backend/prisma/schema.prisma |
| 后端服务 | backend/src/services/diet.service.ts |
| 后端控制器 | backend/src/controllers/diet.controller.ts |
| 前端枚举定义 | frontend/src/constants/enums.ts |
| 前端类型 | frontend/src/types/diet.d.ts |
| 前端页面 | frontend/src/pages/Diet.tsx |
| 前端状态 | frontend/src/stores/dietStore.ts |
| 种子数据 | database/seeds/seed.ts |

### PlanStatus

| 位置 | 文件路径 |
|------|---------|
| 后端枚举定义 | backend/src/constants/enums.ts |
| Prisma Schema | backend/prisma/schema.prisma |
| 后端服务 | backend/src/services/training.service.ts |
| 后端控制器 | backend/src/controllers/training.controller.ts |
| 前端枚举定义 | frontend/src/constants/enums.ts |
| 前端类型 | frontend/src/types/training.d.ts |
| 前端页面 | frontend/src/pages/Training.tsx |
| 前端状态 | frontend/src/stores/trainingStore.ts |
| 种子数据 | database/seeds/seed.ts |

### MemberLevel

| 位置 | 文件路径 |
|------|---------|
| 后端枚举定义 | backend/src/constants/enums.ts |
| Prisma Schema | backend/prisma/schema.prisma |
| 后端服务 | backend/src/services/member.service.ts |
| 后端控制器 | backend/src/controllers/member.controller.ts |
| 前端枚举定义 | frontend/src/constants/enums.ts |
| 前端类型 | frontend/src/types/member.d.ts |
| 前端组件 | frontend/src/components/common/StatusBadge.tsx |
| 前端页面 | frontend/src/pages/Members.tsx |
| 前端状态 | frontend/src/stores/memberStore.ts |
| 种子数据 | database/seeds/seed.ts |

### UserRole

| 位置 | 文件路径 |
|------|---------|
| 后端枚举定义 | backend/src/constants/enums.ts |
| Prisma Schema | backend/prisma/schema.prisma |
| 后端中间件 | backend/src/middlewares/auth.middleware.ts |
| 后端中间件 | backend/src/middlewares/role.middleware.ts |
| 前端枚举定义 | frontend/src/constants/enums.ts |
| 前端 Hooks | frontend/src/hooks/useAuth.ts |
| 前端路由 | frontend/src/router/index.tsx |
| 种子数据 | database/seeds/seed.ts |

## License

MIT
