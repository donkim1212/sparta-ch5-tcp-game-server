# TCP 멀티플레이어 게임 서버 만들기

#### [내일배움캠프] 스파르타) Chapter 5 게임서버 주특기 플러스 개인과제

![스크린샷 2024-07-02 194641](https://github.com/donkim1212/sparta-ch5-tcp-game-server/assets/32076275/c2d7efd6-d7bb-485f-a36f-d975116d5d1a)

- 과제 Specification: [링크](https://teamsparta.notion.site/Chapter-5-060313f2b3da4ec39e729621a6d81d8a)

- 게임 클라이언트 repository: [링크](https://github.com/Ho-yeong/node5_unity_sample) by 조호영 튜터님 (Ho-yeong)
  - **필수**: 위 repository를 clone하고 Assets 디렉토리를 현재 repository의 client/Assets로 덮어 써주세요.
 

<br>

## 1. 개요

Node.js의 기본 모듈인 net의 내장 socket을 이용하여 TCP 게임 서버를 미리 빌드된 게임 클라이언트 사양에 맞춰 구현하고, 여러 클라이언트 유저 간 위치 정보를 동기화 해보는 것이 목적입니다. 위치 정보 동기화에는 <b>Latency 기반의 추측 항법 (Dead Reckoning)</b>을 적용합니다.

#### 주요 학습 내용
- Node.js의 net 모듈을 이용한 TCP socket 서버 구현
- Protobuf를 이용한 데이터 직렬화(serialization) 및 역직렬화(deserialization)와 버퍼 송수신 구현
- RTT(Round Trip Time) 방식의 Latency 측정
- 추측 항법 구현을 위한 삼각 함수와 단위원(Unit Circle) 개념 학습
- Latency 기반의 추측 항법(Dead Reckoning)으로 클라이언트 유저 위치 예측 및 동기화

<br>

## 2. 과제 진행 과정
1일차 (D-7) [블로그 링크](https://donkim0122.tistory.com/97): 프로젝트 기초 세팅<br>
2일차 (D-6) [블로그 링크](https://donkim0122.tistory.com/98): 필수 요구사항 구현 완료<br>
3일차 (D-5) [블로그 링크](https://donkim0122.tistory.com/99): 도전 요구사항 시작, DB 연동 part 1<br>
4일차 (D-4) [블로그 링크](https://donkim0122.tistory.com/101): DB 연동 part 2 - 클라이언트 수정<br>
5일차 (D-3) [블로그 링크](https://donkim0122.tistory.com/102): Latency 기반 추측 항법 구현 part 1<br>
6일차 (D-2) [블로그 링크](https://donkim0122.tistory.com/103): Latency 기반 추측 항법 구현 part 2<br>
7일차 (D-1) [블로그 링크](https://donkim0122.tistory.com/104): 버그 수정 및 마무리<br>

<br>

## 3. 디렉토리 구조

```
├─client
│  └─Assets
│      ├─Scenes
│      │  └─SampleScene
│      └─Src
│          └─Codes
├─protobuf
│  ├─client
│  └─server
└─src
    ├─config
    ├─constants
    │  └─queries
    ├─db
    │  ├─migrations
    │  └─sql
    ├─events
    ├─handlers
    ├─init
    ├─managers
    ├─models
    ├─protobuf
    │  ├─common
    │  ├─gameNotification
    │  └─response
    ├─session
    └─utils
        ├─db
        ├─errors
        │  └─classes
        └─packet
```

## 4. 패킷 구조
[https://github.com/donkim1212/sparta-ch5-tcp-game-server/issues/17](https://github.com/donkim1212/sparta-ch5-tcp-game-server/issues/17)
<br>
