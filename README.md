# Wallet Gateway API

NestJS + TypeScript 기반의 Wallet Gateway API 서버입니다.

## 설치

```bash
pnpm install
```

## 실행

```bash
# 개발 모드
pnpm run start:dev

# 프로덕션 빌드
pnpm run build
pnpm run start:prod
```

## API 스펙

API 스펙은 다음을 참조하세요:

- **Notion 문서**: [Server API Spec](https://www.notion.so/Server-API-Spec-2af7fc3011a9805696b2d08eb63ba5bc?source=copy_link)
- **Swagger UI**: 서버 실행 후 `http://localhost:3000/api`에서 확인 가능

### 주요 엔드포인트

- `POST /v1/wallet` - 주소 생성 요청
- `POST /v1/withdrawal` - 출금 요청

모든 API는 `x-request-id` 헤더가 필수이며, 통일된 응답 형식을 사용합니다.

## 프로젝트 구조

```
src/
├── common/
│   ├── decorators/      # 커스텀 데코레이터
│   ├── filters/         # 예외 필터
│   ├── guards/          # 가드
│   └── dto/             # 공통 DTO
├── wallet/              # 주소 생성 요청 모듈
│   ├── dto/
│   ├── wallet.controller.ts
│   ├── wallet.service.ts
│   └── wallet.module.ts
├── withdrawal/          # 출금 요청 모듈
│   ├── dto/
│   ├── withdrawal.controller.ts
│   ├── withdrawal.service.ts
│   └── withdrawal.module.ts
├── app.module.ts
└── main.ts
```

## 로깅

이 프로젝트는 [nest-logger](https://github.com/dsrvlabs/nest-logger)를 사용합니다.

### HTTP 로깅

`HttpLoggerMiddleware`가 모든 HTTP 요청/응답을 자동으로 로깅합니다:

- 요청: method, url, body, query, params
- 응답: method, url, statusCode, responseTime, body

### 서비스 로깅

서비스에서 `LoggerService`를 주입받아 사용할 수 있습니다:

```typescript
import { LoggerService } from 'nest-logger';

constructor(private readonly logger: LoggerService) {}

this.logger.log('Message', 'Context');
this.logger.warn('Warning', 'Context');
this.logger.error('Error', 'Stack', 'Context');
```
