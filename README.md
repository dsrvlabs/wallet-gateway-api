# Wallet Gateway API

NestJS + TypeScript 기반의 Wallet Gateway API 서버입니다.

## 설치

```bash
npm install
```

## 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 빌드
npm run build
npm run start:prod
```

## API 엔드포인트

### 주소 생성 요청 API

```bash
POST /v1/wallet
```

**헤더:**
- `x-request-id`: 필수 (UUID 형식)

**요청 본문:**
```json
{
  "organizationId": "KqQjPXZna31P4mhQ",
  "coinType": 60,
  "accountId": 0,
  "change": 0
}
```

**응답 (201 Created):**
```json
{
  "requestId": "2f3b4f7c-7a6d-4b39-9a56-7b0f1e9a1b10"
}
```

### 출금 요청 API

```bash
POST /v1/withdrawal
```

**헤더:**
- `x-request-id`: 필수 (UUID 형식)

**요청 본문:**
```json
{
  "organizationId": "0b9f4c27-74a2-4dc4-9b47-3e2a1c8a7f51",
  "coinType": 60,
  "from": "0x1111111111111111111111111111111111111111",
  "to": "0x2222222222222222222222222222222222222222",
  "amount": "0.125"
}
```

**응답 (201 Created):**
```json
{
  "requestId": "7c6ae2d6-3e0a-4a38-9a52-5e8b5b2d1e44"
}
```

## 주요 기능

- ✅ 글로벌 Validation Pipe (class-validator, class-transformer)
- ✅ 글로벌 Exception Filter 및 통일된 에러 응답 포맷
- ✅ Winston 기반 로깅 (nest-logger)
  - HTTP 요청/응답 로깅 (HttpLoggerMiddleware)
  - 요청/응답 시간 측정
  - 서비스 레벨 로깅 (LoggerService)
- ✅ `x-request-id` 헤더 필수 검증 (UUID 형식)
- ✅ Idempotency 지원 (동일한 request-id로 중복 요청 방지)

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

