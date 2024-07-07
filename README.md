# [내일배움캠프] 스파르타) Chapter 5 게임서버 주특기 플러스 개인과제 - WIP

## TCP 멀티플레이어 게임 서버 만들기

![스크린샷 2024-07-02 194641](https://github.com/donkim1212/sparta-ch5-tcp-game-server/assets/32076275/c2d7efd6-d7bb-485f-a36f-d975116d5d1a)

- 과제 Specification: [링크](https://teamsparta.notion.site/Chapter-5-060313f2b3da4ec39e729621a6d81d8a)

- 게임 클라이언트 repository: [링크](https://github.com/Ho-yeong/node5_unity_sample) by 조호영 튜터님 (Ho-yeong)
  - 위 repository를 clone하고 Assets 디렉토리를 현재 repository의 client/Assets로 덮어 써주세요.

<br>

## 개요

Node.js의 기본 모듈인 net의 내장 socket을 이용하여 TCP 게임 서버를 미리 빌드된 게임 클라이언트 사양에 맞춰 구현하고, 여러 클라이언트 유저 간 위치 정보를 동기화 해보는 것이 목적입니다. 위치 정보 동기화에는 <b>Latency 기반의 추측 항법 (Dead Reckoning)</b>을 적용합니다.

<br>

## -
