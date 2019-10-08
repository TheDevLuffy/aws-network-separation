# AWS 에서 Network Separation 을 테스트하기 위한 레포지토리입니다.

> 해당 레포지토리는 서버만 띄워놓은 인스턴스의 서버 코드입니다.
> 모든 데이터는 json 으로 주고 받습니다.
> Express RESTful API 입니다.

## AWS EC2 인스턴스

### 구조

![Alt text](https://raw.githubusercontent.com/TheDevLuffy/aws-network-separation/master/structure.png)

### Server 는 서버만 띄워둡니다.

해당 디렉터리의 코드를 clone 받아 실행합니다.

### DB 는 DB만 띄워둡니다.
1. mariadb 설치
    ```
    sudo apt-get install mariadb-server
    ```

2. mariadb 원격 접속 허용 유저 생성
    ```
    grant all privileges on [DB_NAME].* to '[REMOTE_USER]'@'[REMOTE_INSTANCE_IP]' identified by '[REMOTE_USER_PASSWORD]';
    ```

3. mariadb 원격 접속 허용

* bind-address 대역 변경

파일의 경로는 ``/etc/mysql/mariadb.conf.d/50-server.cnf`` sudo 권한으로 수정한다.

```
# Instead of skip-networking the default is now to listen only on
# localhost which is more compatible and is not less secure.
  bind-address          = 0.0.0.0
```

## 서버 실행을 위해서 필요한 작업

1. 프로젝트 최상위 디렉토리에 ``.env`` 파일을 만들고 내부에 설정에 맞도록 아래의 내용을 입력합니다.
    ```
    DB_USER=[DB용_instance_의_DB_USER]
    DB_PASS=[DB용_instance_의_DB_PASSWORD]
    DB_NAME=[DB용_instance_의_DB_NAME]
    DB_DIAL=[DB용_instance_의_DB_DIALECT]
    
    REMOTE_PORT=3306
    REMOTE_HOST=[DB용_instance_의_private_ip]
    ```

2. ``npm i`` 를 실행하여 패키지들을 모두 설치합니다.

3. ``npm run serve`` 를 하면 개발용 서버가 실행됩니다. (테스트 목적이므로 개발용 서버만 실행합니다.)

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


## Issue Timeline 

1. 처음에 우테코 보안 그룹을 그대로 복붙해서 사용했다.

    * 아예 연결 조차 되지 않는다. Sequelize ORM Connection 이 바로 죽어버렸다.
    
2. DB 전용 인스턴스의 인바운드 보안 그룹에 모든 소스, 포트 3306 을 추가했다.

    * Connection Timeout 이 떴다.
    * Connection 이 바로 죽은건 요청 조차 보내지 못한다는 것으로 알고 있는데 이건 Timeout 이 뜨는 걸 보니 응답을 못 받아서 그런 것 같다고 짐작.
    * 역시나 맞았다. WEB 전용 인스턴스의 인바운드 보안 그룹에도 모든 소스, 포트 3306 을 추가하니 잘 작동한다.
    
3. 이제 문제는 보안을 위해 인바운드와 아웃바운드를 조정해야 한다.

    * ~~DB 전용 인바운드 그룹에는 WEB 전용 인스턴스의 IP 대역을 추가한다.~~
    * ~~WEB 전용 인바운드 그룹에는 DB 전용 인스턴스의 IP 대역을 추가한다.~~
    
    * DB 전용 인바운드 소스에 WEB 전용 보안 그룹의 그룹 ID 를 추가한다. (포트를 지정이 필요하다.)
    * WEB 전용 인바운드 소스에 DB 전용 보안 그룹의 그룹 ID 를 추가한다. (포트를 지정이 필요하다.)
    
    * 이후 두 인스턴스는 동일한 vpc 에 묶여있기 때문에 private ip 를 이용하여 접근이 가능하다.
    
    > 참고 : [God졸두 블로그](https://jojoldu.tistory.com/430)