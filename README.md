# 우리들의 문화생활, MUNA

공연 정보 제공 및 관람 후기 작성과 공유를 위한 모바일 웹 플랫폼 (24.09.23 ~
24.10.21)

<img src="./public/muna_intro.jpg" alt="MUNA 커버이미지" width="480" />

### 배포 링크, 테스트 계정

- 배포 링크: [https://munamuna.netlify.app](https://munamuna.netlify.app/)
- ID: [demo.account@example.com](mailto:demo.account@example.com)
- PW: DemoUser#2024

## 팀원 소개

- **김민서** / [@page1597](https://github.com/page1597) /
  [gimm08377@gmail.com](mailto:gimm08377@gmail.com)
  - **페이지 개발**: Main, Concert Detail, Login, Signup, Review Edit
  - **주요 기능**: 로그인/회원가입, 북마크, 이미지 업로드, 리뷰 작성
  - **UI 컴포넌트**: Tab, Input, StarForm 등
  - **세팅**: Firebase, Redux Toolkit, Toast
- **김재은** / [@move-to-next](https://github.com/move-to-next) /
  [jaeeun0095@gmail.com](mailto:jaeeun0095@gmail.com)
  - **페이지 개발**: Review Detail
  - **주요 기능**: 리뷰 좋아요, 삭제
  - **UI 컴포넌트**: Avatar, StarScoreButton 등
  - **디자인**: Main UI
- **임다온** / [@accguy](https://github.com/accguy) /
  [daon0912@gmail.com](mailto:daon0912@gmail.com)
  - **페이지 개발**: Search, SearchResult, ConcertList
  - **주요 기능**: 검색, 무한 스크롤, 필터, 정렬
  - **UI 컴포넌트**: Header, ConcertCard 등
  - **세팅**: GitHub, Netlify 배포
- **정다영** / [@diayeri](https://github.com/diayeri) /
  [jdyoung1031@gmail.com](mailto:jdyoung1031@gmail.com)
  - **페이지 개발**: Profile, Settings
  - **주요 기능**: 회원 탈퇴, 프로필 수정
  - **UI 컴포넌트**: Modal, BookmarkButton, ReviewCard 등
  - **디자인**: 전체 페이지 UI, 컴포넌트 디자인시스템 정리

## **기술 스택**

### 프레임워크 및 라이브러리

- **React**
- **TypeScript**
- **SCSS**
- **Redux Toolkit**

### 데이터베이스 및 계정 관리

- **Firebase**
  - **Firestore**
  - **Authentication**
  - **Emulator**

### HTTP 클라이언트 및 유틸리티

- **Axios**
- **UUID**
- **Lodash**

### UI 구성 요소

- **React-Slick**
- **Slick-Carousel**
- **React-Hot-Toast**

### 코드 품질 도구

- **ESLint**
- **Prettier**

### 디자인 및 프로토타입

- [**Figma**](https://www.figma.com/design/MoqNhCMEZPImSkoig8w9cK/%ED%8C%8C%EC%9D%B4%EB%84%90---%EA%B3%B5%EC%97%B0%EC%A0%95%EB%B3%B4UI?node-id=39-1814)

### 프로젝트 및 이슈 관리

- **GitHub**
- **Notion**
- **Asana**

### 소통 채널

- **Discord**

## 개발 환경설정

### **커밋 컨벤션**

- **feat**: 새로운 기능 추가
- **ui**: UI 요소, 스타일링, UX 개선 및 디자인 변경 사항
- **fix**: 버그 수정
- **perf**: 성능 개선
- **refactor**: 코드 리팩토링 (기능 변경 없음)
- **chore**: 빌드 설정, 패키지 관리, 기타 보조 작업
- **docs**: 문서 작업 (README, 주석 등)

### 브랜치 전략

- **Feature Branch Workflow**를 사용해 각 기능을 독립적으로 개발했습니다.
- 각자의 페이지나 기능에 맞는 브랜치를 생성하고, 해당 브랜치에서 기능 개발 및
  커밋을 진행했습니다.
- 완료된 기능은 Pull Request를 통해 메인 브랜치에 병합 요청하며, 이 과정에서
  코드 리뷰와 충돌 해결을 거쳐 안정적인 코드만 메인에 병합합니다.
- 이를 통해 협업 시 충돌을 최소화하고, 코드 품질을 유지했습니다.

### 코드 포매터 및 품질 관리

Prettier와 ESLint를 함께 사용하여 코드 스타일을 일관되게 유지하고 코드 품질을
관리했습니다. Prettier는 코드 포맷팅을 자동화하고, ESLint는 코드 품질 검사와
오류 방지를 담당했습니다. 특히, Airbnb 룰을 적용하여 엄격하고 일관된 코드
스타일을 유지함으로써 협업 시 코드 가독성과 품질을 높였습니다.

## **설치 및 실행 방법**

### 로컬에서 실행하기 위한 필수 요구사항

- Node.js (버전 14 이상)
- npm 또는 yarn

### 설치 및 실행 명령어

1. 프로젝트 클론

```bash
git clone https://github.com/TEAM-MUNA/muna.git
cd muna
```

2. 의존성 설치

```bash
# npm을 사용하는 경우
npm install

# yarn을 사용하는 경우
yarn install
```

3. 프로젝트 실행

```bash
# npm을 사용하는 경우
npm start

# yarn을 사용하는 경우
yarn start
```

### 환경 변수 설정 방법: .env 파일 예시

`muna` 프로젝트의 루트 디렉토리에 `.env` 파일을 생성하고 아래와 같은 형식으로
환경 변수를 설정합니다:

```
REACT_APP_projectId=your_project_id_here
REACT_APP_storageBucket=your_storage_bucket_here
REACT_APP_messagingSenderId=your_messaging_sender_id_here
REACT_APP_appId=your_app_id_here
REACT_APP_measurementId=your_measurement_id_here
REACT_APP_kopisKey=your_kopis_key_here
DISCORD_WEBHOOK_URL=your_discord_webhook_url_here
```

위 파일의 변수들을 실제 API 키와 URL 등으로 변경한 후 저장하면 됩니다. `.env`
파일은 보안 및 환경 차이로 인해 Git에 커밋되지 않도록 `gitignore`에 추가해두는
것이 좋습니다.

REACT_APP_kopisKey 등록을 위해
https://www.kopis.or.kr/por/cs/openapi/openApiUseSend.do?menuId=MNU_00074 에서
인증키를 발급 받는 과정이 필요합니다.

## **주요 기능**

### 후기 작성

- 사용자가 원하는 공연에 대한 후기 작성 가능.
- 공연 관람일, 별점 평가(선택), 후기 사진을 입력할 수 있음.
- 후기 사진은 다중 이미지 선택 및 삭제가 가능하며, 드래그 앤 드롭 기능으로 사진
  순서를 변경할 수 있음.
- 후기 등록 시, 이미지는 Firebase Storage에 저장되며, 후기 정보를 Firebase의
  review, user, concert 컬렉션에 업데이트 함.
- Firebase의 데이터를 Redux를 통해 동기화하여 사용자 인터렉션(Activity) 상태를
  실시간으로 업데이트 함.

### 검색

- 사용자가 원하는 공연을 실시간 검색하여 관련된 공연 목록을 즉시 확인 가능.
- 디바운싱을 적용하여 일정 시간 동안 추가 입력이 없을 때만 서버로 요청을 보내
  최적화된 검색 경험 제공.
- 검색어는 Redux에 저장되어 전역 상태 관리가 가능하며, 검색 결과 페이지, 검색
  기록 등 다양한 컴포넌트에서 참조됨.
- 최근 검색어 기록은 로컬 스토리지에 저장되며 최대 5개 유지됨. 검색어 기록 삭제
  가능.
- Firebase에서 북마크 수가 높은 공연 6개를 포스터와 함께 추천, 검색 결과 페이지
  하단에 노출되어 사용자에게 추천 콘텐츠를 제공.

### 북마크

- 사용자가 원하는 공연을 북마크하여 프로필에서 북마크 목록을 확인 가능. 나의
  북마크만 확인 가능하며, 다른 사용자의 북마크는 볼 수 없음.
- user 컬렉션에 북마크한 공연 정보를 저장하고, Firebase의 데이터를 Redux를 통해
  동기화하여 북마크 상태를 유지.
- 북마크 여부를 초기 상태로 설정하고, useToggle을 사용해 북마크를 추가/해제할 수
  있도록 토글 기능 제공.
- 비동기 dispatch로 북마크 상태를 업데이트하며, 성공/실패 시 메시지 표시.
  로그인하지 않은 사용자는 오류 메시지 출력.

## **프로젝트 구조**

```bash
src/
├── api/                          # API 통신 모듈 폴더
│   ├── firebaseApi.js            # Firebase API 호출 파일
│   ├── kopisApi.js               # 외부 API(Kopis API) 호출 파일
│   ├── auth.js                   # 인증 관리
│   ├── concertInfo.js            # 공연 정보 관리
│   └── reviewInfo.js             # 리뷰 정보 관리
│
├── app/                          # 전역 상태 관리 및 공통 훅 폴더
│   ├── store.ts                  # Redux 스토어 설정 파일
│   └── hooks.ts                  # 전역 상태 접근 공통 훅 정의
│
├── assets/                       # 이미지, 폰트 및 아이콘 폴더
│   ├── img/                      # 일반 이미지 파일 저장
│   └── svg/                      # React 컴포넌트 형태의 SVG 아이콘 관리
│
├── components/                   # 재사용 가능한 UI 컴포넌트 폴더
│   ├── common/                   # 공통 컴포넌트 (버튼, 입력 폼, 모달 등)
│   └── layout/                   # 레이아웃 컴포넌트 (Header, Footer 등)
│
├── context/                      # 전역 관리 React Context 폴더
│   └── RequestContext.tsx        # 요청 상태 관리
│
├── firebase/                     # Firebase 설정 파일 폴더
│   └── index.ts                  # Firebase 초기화 및 설정 파일
│
├── hooks/                        # 커스텀 훅 모음 폴더
│   ├── useCloseOnOutsideClick.js # 외부 클릭 감지
│   └── useGetConcertList.js      # 콘서트 목록 정보 조회
│
├── utils/                        # 유틸리티 함수 폴더
│   ├── getResizeImage.js         # 이미지 크기 조정 함수
│   └── parseXml.js               # XML 파싱 함수
│
└── pages/                        # 페이지 컴포넌트 폴더
    ├── ConcertList.js            # 공연 리스트 페이지
    ├── Login.js                  # 로그인 페이지
    └── Profile.js                # 프로필 페이지

```

## 전체 일정

![muna_intro.jpg](/public/mermaid.svg)
