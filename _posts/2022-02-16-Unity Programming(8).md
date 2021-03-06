# 탄막 슈팅 게임 '닷지' - 탄알 제작

---

# 탄알 생성기 준비

탄알 오브젝트가 준비되었으므로 탄알 생성기를 만들어보자. 탄알 생성기 게임 오브젝트는 랜덤한 시간 간격으로 탕알을 생성해 플레이어를 향해 발사한다. 탄알 생성기의 기능은 다음과 같다.

1. 붉은 원기둥 모양
2. 랜덤한 시간 간격으로 탄알 생성
3. Bullet 프리팹을 원본으로 탄알을 생성
4. 플레이어를 향하도록 탄알을 생성

원기둥(Cylinder) 오브젝트 생성 및 색깔 설정은 건너뛰겠다.

<p align = "center">
<img width="1284" alt="image" src="https://user-images.githubusercontent.com/68016394/154257510-820044ba-5975-47ef-ac63-480b6722d585.png">
원기둥 오브젝트 생성 및 머티리얼 설정 - Bullet Spawner
</p>

이제 탄알 생성기를 위한 스크립트를 만들어보자.

**탄알 생성기 스크립트 만들기**

탄알 생성기는 기능을 하기 위해 다음과 같은 변수들이 필요하다.

1. 생성할 탄알의 원본 - 프리팹
2. 탄알을 발사하여 맞출 대상
3. 탄알을 생성하는 시간 간격

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class BulletSpawner : MonoBehaviour{
    public GameObject bulletPrefab; //생성할 탄알의 원본 프리팹
    public float spawnRateMin = 0.5f; //최소 생성 주기
    public float spawnRateMax = 3f; //최대 생성 주기

    private Transform target; //발사할 대상
    private float spawnRate; //생성 주기
    private float timeAfterSpawn; //최근 생성 시점에서 지난 시간

    void Start(){
        
    }

    void Update(){
        
    }
}
```

위와 같이 변수들을 선언하고 스크립트를 만들 준비를 해두자.

**Start() 메서드**

Start() 메서드는 발사를 위한 준비를 해야 한다. 그러므로 시간에 대한 초기화와 발사 목표인 플레이어 오브젝트를 불러와야 한다.

```
void Start(){
    //최근 생성 이후의 누적 시간을 0으로 초기화
    timeAfterSpawn = 0f;
    //탄알 생성 간격을 spawnRateMin과 spawnRateMax 사이에서 랜덤 지정
    spawnRate = Random.Range(spawnRateMin, spawnRateMax);
    //PlayerController 컴포넌트를 가진 게임 오브젝트를 찾아 조준 대상으로 지정
    target = FindObjectOfType<PlayerController>().transform;
}
```

마지막 코드를 잘 살펴보자. FindObjectOfType<>() 메서드는 <>안에 명시된 타입의 오브젝트를 찾아 접근하는 메서드다. 플레이어는 PlayerController라는 이름이 스크립트를 컴포넌트로 가지고 있다. 스크립트명은 클래스명과 같으므로 즉 타입 이름과 같다. PlayerController라는 컴포넌트(타입)을 지닌 오브젝트에 접근해 해당 오브젝트의 transform 값을 가져와 transform 타입의 target 변수에 대입해 탄알을 조준할 수 있도록 하는 것이다. 

다만 FindObjectOfType<>() 메서드는 씬 내의 모든 오브젝트를 탐사하기에 비용이 큰 메서드이다. 그러므로 Start() 같은 한두번 실행되는 메서드 내에서 사용해야한다. Update() 같은 메서드 내에서 사용하면 심각하게 느려질 수도 있다.

FindObjectsOfType<>() 메서드도 있다. Objects라는 메서드명에서 알 수 있듯이 모든 오브젝트를 찾아 배열로 반환한다. 

**일정 주기로 실행 반복하기**

Update() 메서드를 활용해 탄알을 생성할 것이다. 그러나 그대로 사용하면 1초에 수십개의 탄알이 발사되므로 난이도가 너무 어려워진다. 이를 해결하기 위해 마지막으로 탄알이 생성된 시간을 체크하는 timeSpawnRate 변수를 활용한다.

timeAfterSpawn 값은 시간의 흐름에 맞춰 증가한다. 주기적으로 현재 timeAfterSpawn 변수값을 체크해서 탄알 생성 주기보다 커진 순간 탄알을 생성하고 timeAfterSpawn을 0으로 리셋한다. 이를 반복하면 일정 주기로 총알을 발사할 수 있다. 이때 필요한것이 Update() 메서드의 실행 시간 간격이다.

**Update() 메서드의 실행 시간 간격**

Update() 메서드는 앞에서 배웠던대로 화면의 갱신 시 마다 실행된다. 따라서 직전 Update()의 실행과 현재 Update()의 실행 사이의 시간 간격이 한 프레임을 그리는데에 소요되는 시간이다. 

Time.deltaTime 메서드를 사용하면 프레임 사이의 시간 간격이 자동으로 할당되어 사용할 수 있다. 60FPS의 컴퓨터에서는 1/60이 되고 120FPS의 컴퓨터에서는 1/120이 된다. 그러므로 Update() 메서드에서 변수에 Time.deltaTime을 누적해서 더해가면 시간을 계산할 수 있다. 

**Instantiate() 메서드**

탄알을 복제하는데 Instantiate() 메서드를 사용할 것이다. 유니티에서 게임 플레이중 실시간으로 오브젝트를 생성하는데에 사용하는 메서드이다. 

`
Instantiate(원본, 위치, 회전);
`

위의 코드처럼 원본을 파라미터로 넣으면 해당 원본을 본딴 오브젝트를 생성한다. 즉, 클래스에서 객체를 찍어내는 것이다! (인스턴스화). '위치'와 '회전' 파라미터도 넣어서 실행하면 생성할 위치와 회전 정도도 지정할 수 있다. 

이제 위의 내용을 바탕으로 Update() 메서드를 완성해보자.

```
void Update(){
    //timeAfterSpawn 갱신
    timeAfterSpawn += Time.deltaTime;

    //최근 생성 시점에서부터 누적된 시간이 생성 주기보다 크거나 같다면 실행
    if (timeAfterSpawn >= spawnRate){
        //누적된 시간 리셋
        timeAfterSpawn = 0;

        //총알 생성, 만들어둔 탄알 프리팹을 원본으로 쓰고 탄알생성기 자신의 위치와 회전 정도를 동일하게 탄알에게 줌
        GameObject bullet = Instantiate(bulletPrefab, transform.position, transform.rotation);
        //생성된 bullet 게임 오브젝트의 정면 방향이 target(플레이어)를 향하도록 설정
        bullet.transform.LookAt(target);
        //다음 생성 간격을 랜덤하게 다시 설정
        spawnRate = Random.Range(spawnRateMin, spawnRateMax);
    }
}
```

마지막에 쓰인 LootAt() 메서드는 해당 방향으로 오브젝트의 Rotation을 변경한다.

제일 마지막에 생성 간격도 다시 랜덤하게 설정하기에 보다 더 불규칙적으로 탄알을 생성할 수 있다. 

이를 이제 저장하고 bulletSpawner 오브젝트에 적용해보자. 

<p align = "center">
<img width="1678" alt="image" src="https://user-images.githubusercontent.com/68016394/154274969-7ba7fd35-ec49-48b7-ac6b-b398ffeb4ff2.png">
완성된 탄알 생성기
</p>

bulletSpawner 오브젝트에 스크립트를 컴포넌트로 추가했다면 bullet Prefab에 할당될 오브젝트를 Asset의 Bullet 프리팹으로 설정해주기까지 완료하자. (상단 그림의 우측 하단)

# 완성!

자 이제 총알생성기를 상하좌우 4개 모든곳에 설치해주자. 프리팹으로 만들어뒀으므로 간단하게 이미 만들어준 총알생성기를 복제해서 설치할 수 있다. Position 좌표만 수정해 적절한 위치에 두고 씬을 플레이해보자.

<p align = "center">
<img width="1285" alt="image" src="https://user-images.githubusercontent.com/68016394/154928386-acc7ddf8-3a89-42be-9dd8-73730366d10b.png">
완성!
</p>

넘모 재밌고? 근데 갸어려움

# 요약

1. 게임 오브젝트를 프리팹(Prefab)으로 만들어 재활용할 수 있다.
2. 리지드바디 컴포넌트의 Use Gravity 필드를 해제하면 중력의 영향을 받지 않는다.
3. 변수 transform은 스크립트에서 자신의 트랜스폼 컴포넌트로 바로 접근하는 지름길이다.
4. Destroy() 메서드는 주어진 오브젝트를 파괴하고 두번째 파라미터로 파괴 지연시간을 설정할 수 있다.
5. 트리거 콜라이더는 충돌은 감지하되 상대방 콜라이더를 밀어내지 않는다.
6. OnTriggerEnter(), OnCollisionEnter() 메서드로 충돌을 감지할 수 있다.
7. OnCollisionEnter()은 일반 충돌 시 자동으로 실행된다.
8. OnCollisionStay(), OnCollisionExit()으로 각각 충돌하는 동안과 충돌을 마칠 때를 감지할 수 있다.
9. OnTriggerEnter()은 트리거 충돌시에 자동으로 실행된다.
10. OnTriggerStay(), OnTriggerExit()으로 각각 트리거로 충돌하는 동안과 충돌을 마칠 때를 감지할 수 있다.
11. 충돌한 상대방 게임 오브젝트를 태그로 식별할 수 있다.(플레이어 오브젝트는 우리가 태그로 Player로 지정했었다!)
12. FindObjectOfType()은 씬에 있는 모든 오브젝트를 검색하여 원하는 타입의 오브젝트를 가져온다.
13. Instantiate() 메서드는 입력한 원본 오브젝트의 복제본을 생성한다. 

