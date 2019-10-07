# AWS 에서 Network Separation 을 테스트하기 위한 레포지토리입니다.

> 해당 레포지토리는 서버만 띄워놓은 인스턴스의 서버 코드입니다.

## 서버 실행을 위해서 필요한 작업

1. 가장 상위 디렉토리에 ``.env`` 파일을 만들고 내부에 설정에 맞도록 아래의 내용을 입력합니다.
```
DB_USER=[DB용_instance_의_DB_USER]
DB_PASS=[DB용_instance_의_DB_PASSWORD]
DB_NAME=[DB용_instance_의_DB_NAME]
DB_HOST=[DB용_instance_의_HOST_URL]
DB_DIAL=[DB용_instance_의_DB_DIALECT]
```

2. ``npm i`` 를 실행하여 패키지들을 모두 설치합니다.

3. ``npm run serve`` 를 하면 개발용 서버가 실행됩니다.

## DB Settings

1. 새로운 유저 생성
```
create user [생성할_USER]@'localhost' identified by '[PASSWORD]';
```

2. 특정 DB에 대하여 권한 부여
```
grant all privileges on [DB_NAME].* to 'sa'@'localhost';
```

3. 원격에서 접속 가능한 사용자
localhost만 원격 접속 Client의 IP로 바꿔서 입력해주면 된다.