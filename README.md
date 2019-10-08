# AWS 에서 Network Separation 을 테스트하기 위한 레포지토리입니다.

> 해당 레포지토리는 서버만 띄워놓은 인스턴스의 서버 코드입니다.
> 모든 데이터는 json 으로 주고 받습니다.
> Express RESTful API 입니다.

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

## AWS EC2 인스턴스

### Server 는 서버만 띄워둡니다.


### DB 는 DB만 띄워둡니다.
1. mariadb 설치
```
sudo apt-get install mariadb-server
```

2. mariadb 원격 접속 허용 유저 생성
```
grant all privileges on [DB_NAME].* to '[REMOTE_USER]'@'[REMOTE_INSTANCE_IP]' identified by '[REMOTE_USER_PASSWORD]';
```


## DB Table

테이블은 하나만 사용합니다.

1. Delivery
    - address : String (VARCHAR, 100)
    - orderer : String (VARCHAR, 100)
    - menu : String (VARCHAR, 100)
    
## RequestMapping

1. ``GET /delivery``

    * request query params
        * id (optional)
    
    * response
        1. id 가 없으면 모든 데이터를 반환
        2. id 가 있으면 해당 id 에 데이터를 반환

2. ``POST /delivery``

    * request body
        ```
        {
            "address": "delivery 주소",
            "orderer": "delivery 주문자",
            "menu": "주문한 메뉴"
        }
        ```
    
    * response data
        ```
        {
            "id": "1",
            "address": "서울시 송파구 루터회관 14층 우아한테크코스",
            "orderer": "루피",
            "menu": "삼계탕",
            "createdAt": "[timestamp]"
            "updatedAt": "[timestamp]"
        }
        ```

3. ``PATCH /delivery``

    * request body
        ```
        {
            "id": "변경할 id",
            "address": "변경할 주소"
        }
        ```
      
    * response data
        * ``200 OK``
        ```
        {
            "id": "1",
            "address": "변경된 주소",
            "orderer": "루피",
            "menu": "삼계탕",
            "createdAt": "[timestamp]"
            "updatedAt": "[timestamp_변경된_시간]"
        }
        ```
        * ``404 NOT FOUND``
        ```
        {
            "message": "문제가 발생하였습니다."
        }
        ```

4. ``DELETE /delivery``
    * request body
    ```
    {
        "id": "1"
    }
    ```
   
   * response data
       * ``200 OK``
       ```
       {
            "message": "배달이 완료되었습니다."
       }
       ```
       * ``404 NOT FOUND``
       ```
       {
            "message": "확인되지 않은 주문입니다."
       }
       ```

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