# 탄막 슈팅 게임 '닷지' - 탄알 제작

---

앞에서 레벨과 플레이어 게임 오브젝트를 만들고 조작할 수 있도록 설정을 마쳤다. 이제 탄알 게임 오브젝트를 완성하고, 탄알 생성기로 탄알을 주기적으로 생성해 플레이어와 상호작용할 수 있도록 만들자

## 탄알 게임 오브젝트 준비

게임에서 탄알은 생성된 후 앞쪽으로 일정 속도로 날아가며, 어떤 게임 오브젝트와 충돌했을 때 그 오브젝트가 플레이어라면 파괴하는 기능을 한다.

**Bullet 게임 오브젝트 생성**

1. 구(Sphere) 게임 오브젝트 생성(Hierarchy > Create > 3D object > Sphere)
2. 오브젝트의 이름을 Bullet으로 변경
3. 오브젝트의 위치를 (0, 5, 0), 스케일을 (0.5, 0.5, 0.5)로 변경
4. Hierarchy 창에서 Bullet 더블클릭 > Bullet 게임 오브젝트가 씬에서 포커스 됨

**Bullet의 머티리얼 설정**

1. 상단 Assets > Create > Material
2. 생성된 머티리얼의 이름을 Bullet Color로 설정
3. Inspector 창에서 Bullet Color 머티리얼의 Albedo의 색깔을 (255, 0, 0)으로 변경
4. 설정을 완료한 머티리얼을 Bullet 오브젝트에 드래그&드랍으로 적용

<p align = "center">
<img width="1284" alt="image" src="https://user-images.githubusercontent.com/68016394/154226015-5860b393-41c9-4360-be1d-e6777504e0c9.png">
Bullet 오브젝트 생성 및 머티리얼 적용
</p>

**리지드바디 컴포넌트 설정하기**

탄알이 속도를 가지도록 Bullet 게임 오브젝트에 리지드바디 컴포넌트를 추가하자

탄알은 중력의 영향을 받지 않고 앞으로만 나아가야하므로 리지드바디 컴포넌트의 'Use Gravity'를 체크 해제해 중력의 영향을 받지 않도록 설정하자.

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/154226102-26b57de1-534c-42f1-a22c-1441c2a0c4d0.png">
리지드바디 컴포넌트 적용 및 무중력 설정
</p>

**콜라이더 설정하기**

Bullet 오브젝트는 Shpere 오브젝트이므로 구 콜라이더(Sphere Colider)가 추가되어 있어 물리적인 표면이 존재한다. 따라서 콜라이더를 지닌 다른 게임 오브젝트와 충돌하게 된다. 

이제 탄알이 다른 탄알과 충돌했을 경우에는 충돌이 일어나지 않도록 설정할 것이다, 이때 트리거(Trigger)로 설정된 콜라이더를 사용한다.

**트리거 콜라이더**

트리거 콜라이더는 충돌을 감지하긴 하지만 실제로 접촉이 일어나는 물리적 표면은 지니고 있지 않다, 즉 충돌을 감지해 어떤 기능을 실행할지 말지 결정하는 방아쇠(Trigger)의 역할을 한다. 

예를들어 플레이어가 결승선에 통과했는지 아닌지를 판단하기 위해 트리거 콜라이더를 사용한다. 아니면 어떤 지역이나 구역에 들어서면 적을 스폰하기 위해서도 사용하는 등 굉장히 유용한 기능이다.

Bullet 오브젝트의 Inspector 창 > Sphere Collider 컴포넌트의 'Is Trigger' 박스에 체크하면 트리거 콜라이더로 설정할 수 있다.

**Bullet을 프리팹으로 만들기**

Bullet 게임 오브젝트 구성이 완료되었으므로 탄알생성기를 만들어 탄알을 게임중 실시간으로 생성되게 만들 것이다.

'프리팹(Prefab)'은 언제든지 재사용할 수 있는 미리 만들어진 게임 오브젝트 asset이다. 비슷한 게임 오브젝트를 여러 개 만들 때 매번 다시 설정하는 번거로움을 줄이기 위해 프리팹을 사용한다. 

게임 오브젝트를 프리팹으로 만들어두면 나중에 간편하게 복제해 사용할 수 있다. 프리팹은 파일로 저장되기 때문에 현재 씬뿐만 아니라 얼마든지 다른 씬에서 재활용할 수 있다. (Asset 창에 C# 스크립트 파일도 표시되는것을 기억해보자!)

특정 게임 오브젝트를 프리팹으로 만들려면 드래그&드랩으로 Hierarchy창에 있던 오브젝트를 Asset창으로 끌어오자.

<p align = "center">
<img width="1278" alt="image" src="https://user-images.githubusercontent.com/68016394/154228378-d9768bf6-fb73-4e34-87c0-4ffe6a99e3e4.png">
Bullet 오브젝트를 프리팹으로 설정
</p>

프리팹이 된 Bullet 오브젝트를 Hierarchy 창에서 보면 파란색으로 보이는 것을 확인할 수 있다. 프리팹으로 복제된 게임 오브젝트는 이처럼 파란색으로 표시된다.

## 탄알 스크립트 준비

이제 완성된 탄알 오브젝트가 제대로 작동하도록 스크립트를 완성해보자. C# 스크립트를 만들고 Bullet으로 이름을 변경해 준비하자.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float speed = 8f; //탄알 이동 속력
    private Rigidbody bulletRigidbody; //이동에 사용할 리지드바디 컴포넌트

    void start(){
        //게임 오브젝트에서 Rigidbody 컴포넌트를 찾아 bulletRigidbody에 할당
        bulletRigidbody = GetComponent<Rigidbody>();
        //탄알 리지드바디 컴포넌트의 속도 = 앞쪽방향 * 이동 속력으로 벡터값으로 설정
        bulletRigidbody.velocity = transform.forward * speed;
    }
}
```

bulletRigidbody 변수에 GetComponent<>() 메서드로 리지드바디 컴포넌트를 찾아 할당한 뒤 velocity에 속도벡터를 대입해준다. Start() 메서드이므로 탄알이 생성되자마자 앞으로 일정속도로 나아가게 된다.

**transform**

위의 코드에서 transform이 무엇인지를 알아야 한다. Transform타입의 변수인 transform은 오브젝트의 트랜스폼 컴포넌트로 바로 접근하는 변수이다.

C# 스크립트로 편의상 GetComponent<>() 메서드로 찾지 않아도 바로 transform 변수로 접근해서 사용할 수 있다.

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/154242733-50fe7ef9-80eb-4bd7-bdf6-865c8bf2224f.png">
transform 변수로 접근하는 오브젝트의 트랜스폼 컴포넌트
</p>

transform.forward는 오브젝트의 앞쪽 방향(Z축)을 나타내는 Vector3 타입의 변수로서 앞쪽 방향을 바로 구할 수 있다.

즉 transform.forward * speed로 방향 * 속도의 벡터값을 구할 수 있는 것이다.

**탄알 자동 파괴하기**

생성된 탄알이 맵 밖으로 빠져나간 후 계속 남아있다면 컴퓨터의 메모리에 어마어마한 부하가 생길것이다. 이를 해결하기 위해 생성된 후 일정시간이 지나면 파괴되도록 설정해야 한다.

Bullet 스크립트의 Start() 메서드를 다음과 같이 수정하자.

```
void start(){
    //게임 오브젝트에서 Rigidbody 컴포넌트를 찾아 bulletRigidbody에 할당
    bulletRigidbody = GetComponent<Rigidbody>();
    //탄알 리지드바디 컴포넌트의 속도 = 앞쪽방향 * 이동 속력으로 벡터값으로 설정
    bulletRigidbody.velocity = transform.forward * speed;

    //3초 뒤 자신의 게임 오브젝트 파괴
    Destroy(gameObject, 3f);
}
```
 
Destroy() 메서드는 특정 오브젝트를 파괴하는 역할을 한다.
 
`
Destroy(Object obj, float t);
`
 
위와같이 사용하며 첫번째 파라미터로 파괴할 오브젝트, 두번째 인자로 초 단위로 지연시간을 줄 수 있다. 지연시간 파라미터는 생략할 수 있고 생략하면 즉시 파괴한다.
 
 
## 탄알의 충돌 처리

이제 탄알과 플레이어가 충돌을 감지하는 기능을 만들어보자.

**충돌 이벤트 메서드**

유니티에서 콜라이더를 가진 게임 오브젝트 A, B가 충돌한다고 가정해보자. A, B는 자신이 충돌했는지를 스스로 파악할 수 없다. 대신 충돌하면 충돌했다는 충돌 메시지가 A, B에게 보내지게 되는데 이를 통해 자신이 다른 오브젝트와 충돌했다는 것을 파악할 수 있다. 

게임 오브젝트와 그 컴포넌트들은 충돌 종류에 따라 OnTriggerEnter 혹은 On collisionEnter 메시지를 받게 된다.

Start() 메서드가 오브젝트가 생성되자 마자 실행되거나 Update() 메서드가 매 프레임마다 실행되는 이유가 해당 메서드의 이름이 Start, Update이기 때문인 것 처럼 충돌 시 실행할 메서드를 만드는 방법은 OnTriggerEnter, OnCollisionEnter 이름의 메서드를 만들면 된다. 

또한 충돌 메시지에 충돌한 대상의 정보도 함께 첨부된다. 그러므로 이 게임에선 탄알이 충돌한 물체가 다른 탄알인지 플레이언지 구분해 적절한 행동을 취할 수 있다.

이처럼 충돌 메시지에 대응하는 메서드를 '충돌 이벤트 메서드' 라고 한다. 

**OnCollision 계열 : 일반 충돌**

일반적인 콜라이더를 가진 두 게임 오브젝트가 충돌할 때 발생하는 충돌 이벤트 메서드로 충돌한 두 콜라이더는 통과되지 않고 서로를 밀어낸다. 종류는 3가지가 있다.

1. OnCollisionEnter(Collision collision) : 충돌한 순간
2. OnColiisionStay(Collision collision) : 충돌하는 동안
3. OnCollisionExit(Collision collision) : 충돌했다가 분리되는 순간

OnCollision 계열의 메서드가 실행될 때에는 충돌 관련 정보가 Collision 타입의 변수로 들어온다. Collision 타입은 충돌 정보를 담는 컨테이너이며 이를 통해 충돌한 대상 오브젝트, 충돌 지점, 충돌 표면의 방향등의 정보를 알 수 있다.

**OnTrigger 계열 : 트리거 충돌**

충돌한 오브젝트 중 하나라도 트리거 콜라이더를 지닌 경우 자동으로 실행되는 메서드들이다. 

1. OnTriggerEnter(Collider other) :충돌한 순간
2. OnTriggerStay(Collider other) : 충돌하는 동안
3. OnTriggerExit(Collider other) : 충돌했다가 분리되는 순간

트리거 충돌은 서로를 그대로 통과하므로 충돌 지점, 충돌 표면의 방향등의 정보는 들어오지 않고 충돌한 상대방 오브젝트가 다이렉트로 들어온다. 

또 하나 주의할 점은 트리거 콜라이더가 아닌 일반 콜라이더를 지닌 오브젝트도 트리거 콜라이더인 오브젝트와 충돌하면 OnTrigger 계열의 메서드가 실행된다는 점이다. 
 
 **탄알에 충돌 감지 구현**
 
 이제 스크립트에 충돌 감지 기능을 구현해보자. 탄알은 트리거 콜라이더였으므로 OnTrigger 계열의 메서드를 사용해야 하며 다음과 같은 기능을 한다.
 
 1. 충돌한 상대방 게임 오브젝트가 플레이어인지 체크
 2. 상대방 게임 오브젝트가 플레이어이면 해당 게임 오브젝트의 PlayerController 컴포넌트의 Die() 메서드 실행

```
void OnTriggerEnter(Collider other){
	//충돌한 상대방 오브젝트가 Player  태그를 가진 경우
	if(other.tag == "Player"){
	    //상대방 게임 오브젝트에서 PlayerController 컴포넌트 가져오기
	    PlayerController playerController = other.GetComponent<PlayerController>();
	
	    //상대방으로부터 PlayerController 컴포넌트를 가져오는 데 성공했다면
	    if(playerController != null){
	        playerController.Die();
	    }
    }
}
```

이리하여 완성된 탄알 오브젝트의 스크립트 코드는 다음과 같다.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bullet : MonoBehaviour
{
    public float speed = 8f; //탄알 이동 속력
    private Rigidbody bulletRigidbody; //이동에 사용할 리지드바디 컴포넌트

    void start(){
        //게임 오브젝트에서 Rigidbody 컴포넌트를 찾아 bulletRigidbody에 할당
        bulletRigidbody = GetComponent<Rigidbody>();
        //탄알 리지드바디 컴포넌트의 속도 = 앞쪽방향 * 이동 속력으로 벡터값으로 설정
        bulletRigidbody.velocity = transform.forward * speed;

        //3초 뒤 자신의 게임 오브젝트 파괴
        Destroy(gameObject, 3f);
    }

    void OnTriggerEnter(Collider other){
        //충돌한 상대방 오브젝트가 Player  태그를 가진 경우
        if(other.tag == "Player"){
            //상대방 게임 오브젝트에서 PlayerController 컴포넌트 가져오기
            PlayerController playerController = other.GetComponent<PlayerController>();

            //상대방으로부터 PlayerController 컴포넌트를 가져오는 데 성공했다면
            if(playerController != null){
                playerController.Die();
            }
        }
    }
}
```

다 작성했으면 이제 Bullet 게임 오브젝트에 스크립트를 컴포넌트로 추가해야 한다.

<p align = "center">
<img width="600" alt="image" src="https://user-images.githubusercontent.com/68016394/154250020-c40e7af7-c7e9-4f55-929b-35e3ca20321c.png">
스크립트를 컴포넌트로 추가 및 프리팹에 적용
</p>

드래그&드랍으로 스크립트를 Hierarchy 창에 있는 Bullet 오브젝트에 넣었다면 위의 그림처럼 Overrides > Apply All로 프리팹에 적용시켜주자. 

프리팹에 연동된 게임 오브젝트는 오브젝트의 변경사항을 위의 방법으로 프리팹 파일에 적용시킬 수 있다. 그 옆에 있는 Revert All을 하게 되면 모든 변경사항이 취소되고 다시 원래대로 돌아간다.


