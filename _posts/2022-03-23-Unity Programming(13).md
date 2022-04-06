# 공간

유니티에서의 공간에 대해 알아보자.

3D 오브젝트는 공간상에서 자신의 위치를 나타낼 수 있는 값을 지닌다. (x, y, z) 로 3개의 축에 대한 위치를 나타내는 '좌표'를 지니게 되는데 우리가 어떤 오브젝트를 만들면 해당 오브젝트의 Inspector창에서 Position값으로 좌표를 설정할 수 있다. 

그렇다면 해당 좌표값이 어떤 공간을 '기준'으로 측정된 값이냐도 중요한 정보다. 기준, 즉 원점이 다르면 좌표값도 다르고 의미하는 바도 달라지기 때문이다. 기본적으로 유니티에서 공간은 다음으로 나뉜다.

1. 전역 공간 
2. 지역 공간
3. 오브젝트 공간

하나씩 살펴보자

## 전역 공간

전역공간은 게임 월드 전체의 원점을 기준으로 측정하는 좌표계이다. 전역 공간에 대해 오브젝트를 평행이동하거나 회전, 확대를 하게 되면 게임월드에 대해 변화하게 된다. 

큐브 오브젝트를 만들고 상단 메뉴바에서 다음과 같이 생긴 버튼을 찾자.

![image](https://user-images.githubusercontent.com/68016394/159629225-0e69ecdd-beab-47f8-ae49-419adbc32773.png)

위의 버튼에서 Global로 되어 있다면 현재 전역공간에 대해 오브젝트를 다루는 상태이다. 이 상태에서 오브젝트를 평행이동해보자. 

![image](https://user-images.githubusercontent.com/68016394/159629363-d18b9390-9324-4263-88be-6786db9f39c5.png)

위의 그림에서 보이는 좌표계는 게임월드 전체에 대한 좌표축이다. X축으로 평행이동을 한다면 게임월드의 X축 방향으로 이동하게 되는 것이다.

## 오브젝트 공간


![image](https://user-images.githubusercontent.com/68016394/159629098-62f405f0-5423-4613-a20b-f007a70ab641.png)

위의 Global 버튼을 눌러 Local로 바꿔보자. 이제 오브젝트를 보게되면 오브젝트 공간에 대해 다룰 수 있게 되었다. 근데 왜 Local인지는 뒤에서 추후 설명하겠다. 


![image](https://user-images.githubusercontent.com/68016394/159629672-755f3c3d-ff3f-42ab-952a-4b2403dd4eb2.png)

아까와는 x,y,z축의 좌표계 방향이 달라졌다. 이제는 오브젝트 자기 자신에 대해 다룰 수 있는 상태이다. 이 상태에서 X축으로 평행이동을 한다면 오브젝트의 X방향에 대해 이동하게 되는 것이다. 

전역공간과 오브젝트공간에 대해 이동할 때 서로 완전히 다른 방향으로 이동하게 된다. 

## 지역 공간

지역 공간에서의 '지역'은 부모 오브젝트에 대한 공간을 의미한다. 앞서 우리는 닷지 게임을 만들 때 한 오브젝트를 다른 오브젝트의 자식 오브젝트로 만들어 관리해본 경험이 있다. 지역 공간은 부모 오브젝트를 기준으로 하는 공간을 의미한다.

Sphere 오브젝트를 만들어 아까 만들어둔 큐브 오브젝트의 자식 오브젝트로 만들어보자. 그렇다면 Inspector창에서 표시되는 Position의 좌표값이 변하는 것을 확인할 수 있다.


![image](https://user-images.githubusercontent.com/68016394/159631957-404ac12c-c420-4e84-802b-e07b93c63b48.png)

<p align='center'>
생성 당시의 좌표값


![image](https://user-images.githubusercontent.com/68016394/159632070-05b4cd47-fe37-427b-8779-fd2ed4055c0a.png)

<p align='center'>
자식 오브젝트 상태에서의 좌표값

여기서 한가지 중요한 점을 알 수 있다.

Inspector창의 Transfrom 컴포넌트에서 표시되는 좌표값은 기본적으로 '지역 공간'에 대한 좌표값을 제공한다. 이는 자식 오브젝트가 아닐 때에도 같은데, 부모 오브젝트가 없다면 게임월드 자체에 대해 자식인 상태이므로 '지역 공간' = '전역 공간'인 상태인 것이다. 

그렇다면 오브젝트 공간과 지역 공간의 차이점은 무엇일까?

유니티에선 오브젝트 공간을 지역 공간에 포함시켜 다룬다. Position, Rotation, Scale등의 값을 변화시킬 때에는 지역 공간에 대해 변화하게 되고, 평행이동시에는 오브젝트 공간, 즉 자기 자신에 대한 원점을 기준으로 평행이동하게 된다. 

정리하면 다음과 같다.


**1. 전역 공간** 

게임월드 자체를 기준으로 하는 좌표계

**2. 지역 공간**

해당 오브젝트의 부모 오브젝트를 기준으로 하는 좌표계, 위치, 회전, 스케일값 측정은 지역 공간, 즉 부모 오브젝트에 대해 다뤄진다.

**3. 오브젝트 공간**

자기 자신에 대한 좌표계. Global이 아닌 Local 상태일 때에는 평행이동을 할때에는 부모 오브젝트(지역 공간)에 대해 평행이동을 하는 것이 아니라 자기 자신(오브젝트 공간)에 대해 평행이동을 한다.

## 오브젝트의 이동과 회전

이제 C# 스크립트를 이용해 오브젝트의 Transform 컴포넌트의 좌표값들을 변경해보자.

우선 Cube 오브젝트와 Sphere 오브젝트의 위치를 초기화하고 Cube 오브젝트를 Sphere 오브젝트의 자식으로 만들자. 그리고 다음과 같이 스크립트 코드를 작성하자.

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Move : MonoBehaviour
{
    public Transform childTransform; //움직일 자식 게임 오브젝트의 트랜스폼 컴포넌트

    void Start(){
        //자신의 전역 위치를 (0, -1, 0)으로 변경
        transform.position = new Vector3(0, -1, 0);
        //자식의 지역 위치를 (0, 2, 0)으로 변경
        childTransform.localPosition = new Vector3(0, 2, 0);

        //자신의 전역 회전을 (0, 0, 30)으로 변경
        transform.rotation = Quaternion.Euler(new Vector3(0, 0, 30));
        //자식의 지역 회전을 (0, 60, 0)으로 변경
        childTransform.localRotation = Quaternion.Euler(new Vector3(0, 60, 0));
    }

    void Update(){
        if (Input.GetKey(KeyCode.UpArrow)){
            //위쪽 방향키를 누르면 초당 (0, 1, 0)의 속도로 평행이동
            transform.Translate(new Vector3(0, 1, 0) * Time.deltaTime);
        }

        if (Input.GetKey(KeyCode.DownArrow)){
            //아래 방향키를 누르면 초당 (0, -1, 0)의 속도로 평행이동
            transform.Translate(new Vector3(0, -1, 0) * Time.deltaTime);
        }

        if (Input.GetKey(KeyCode.LeftArrow)){
            //왼쪽 방향키를 누르면 자신을 초당 (0, 0, 100)으로 회전
            transform.Rotate(new Vector3(0, 0, 100) * Time.deltaTime);
            //자식은 (0, 100, 0) 회전
            childTransform.Rotate(new Vector3(0, 100, 0) * Time.deltaTime);
        }

        if (Input.GetKey(KeyCode.RightArrow)){
            //오른쪽 방향키를 누르면 자신을 초당 (0, 0, -100)으로 회전
            transform.Rotate(new Vector3(0, 0, -100) * Time.deltaTime);
            //자식은 (0, -100, 0) 회전
            childTransform.Rotate(new Vector3(0, -100, 0) * Time.deltaTime);
        }
    }
}
```

위의 스크립트는 부모 오브젝트닌 Sphere 오브젝트의 컴포넌트로 추가해줄 스크립트이다. 그러므로 자기 자신의 Transform 오브젝트는 Transform 변수로 바로 접근할 수 있지만 자기 자식들의 오브젝트는 그럴 수 없으므로 Transform 타입의 변수를 선언해준 뒤 Sphere의 Inspector창에서 Cube 오브젝트를 변수에 할당해준다.

**Translate() 메서드**

Translate() 메서드로 평행이동을 구현할 수 있다. new Vector3로 새로운 벡터값을 만든 뒤 거기에 deltaTime을 곱해주어 1초마다 일정하게 이동하도록 곱해준 뒤 이를 Translate 메서드의 인자로 넣어주어 평행이동을 구현했다. 

Translate() 메서드는 기본적으로 지역 공간을 기준으로 이루어진다. Sphere 객체를 (0, 0, 1)로 이동시키는 것은 Sphere 오브젝트는 자신이 부모 오브젝트이기 때문에 자기 자신에 대해(오브젝트 공간에 대해) 이동하는 것이 되고 Cube 오브젝트는 자식 오브젝트이므로 실제 게임월드에서는 Z축으로 움직이지 않을 수도 있다.

메서드의 파라미터를 하나 더 넣으면 전역 공간에 대해 이동할 것인지 지역 공간에 대해 이동할 것인지를 설정할 수 있는데,

```
transform.Translate(new Vector3(0, 0, 1) * Time.deltaTime, Space.World);
```

위처럼 Space.World 인자를 하나 더 추가하게되면 전역 공간에 대해 이동하게 되고,

```
transform.Translate(new Vector3(0, 0, 1) * Time.deltaTime, Space.self);
```

위처럼 Space.self 인자를 추가하면 자기 자신에 대해, 즉 오브젝트 공간에 대해 평행이동을 하게 된다.

**Rotate() 메서드**

Rotate() 메서드는 회전을 담당하는 메서드이다. 작동법은 Translate() 메서드와 유사하다. 마찬가디로 Space.World와 Space.Self로 작동할 공간 좌표계를 설정할 수 있다. 

즉, Rotate() 메서드나 Translate()메서드를 사용할 때, 전역 공간에 대해 메서드를 사용하고 싶으면 Space.World 인자를 추가하고, 오브젝트 공간에 대해 메서드를 사용하고 싶으면 Space.Self 인자를 추가하고, 지역 공간에 대해 메서드를 사용하고 싶으면 아무것도 추가하지 않으면 된다.

이제 한번 플레이해보면서 회전과 이동을 눈으로 살펴보자.

##실행 결과

일단 Sphere 오브젝트는 30도 회전된 상태로 셋팅이 된다. 이 상태에서 위아래 화살표로 이동시켜보면 사선으로 이동하는 것을 볼 수 있다. 여기서 Space.World 인자를 추가하게 되면 화면상으로도 위아래 수직으로 이동하게 된다. 서로 다른 공간을 기준으로 Translate() 메서드가 작동하는 것이다. 

이제 좌우 방향키로 회전시켜 보자. Cube 오브젝트를 회전하는 코드를 주석처리하고 회전시켜보아도 Cube 오브젝트가 부모 오브젝트인 Sphere 오브젝트를 공전하는 것처럼 보인다. 

이는 처음 Start() 메서드에서 Cube 오브젝트의 Position을 (0, 2, 0)으로 설정했고, 이는 지역 공간, 즉 부모 오브젝트에 대해서 (0, 2, 0)인 것이기 때문에 지역 공간의 중심인 부모 오브젝트가 회전하면 자식 오브젝트들도 같이 회전하기 때문이다. 

## 벡터 연산으로 평행이동 구현하기

**벡터의 속기(Shorthand)**

Vector3 타입에는 속기(Shorthand)라는 미리 만들어진 편리한 변수들이 있다. 자주 사용되는 Vector3 타입의 값을 바로 생성해 사용할 수 있다. 속기의 예들은 다음과 같다. 

1. Vector3.forward -> new Vector3(0, 0, 1)
2. Vector3.back -> new Vector3(0, 0, -1)
3. Vector3.right -> new Vector3(1, 0, 0)
4. Vector3.left -> new Vector3(-1, 0, 0)
5. Vector3.up -> new Vector3(0, 1, 0)
6. Vector3.down -> new Vector3(0,  -1, 0)

위의 벡터들은 모두 크기가 1인 방향벡터임을 유의하자.

**Transform 컴포넌트의 방향**

Transform 컴포넌트를 표현하는 타입의 변수들은 오브젝트 자기 자신의 방향(오브젝트 공간에 대한 방향)을 바로 접근할 수 있는 변수들을 제공한다.

1. tranform.forward : 자신의 앞쪽 방향을 가리키는 방향벡터
2. transform.right : 자신의 오른쪽을 가리키는 방향벡터
3. transform.up : 자신의 위쪽을 가리키는 방향벡터

그리고 위의 세 변수를 활용해 뒤, 왼쪽, 아래쪽을 나타낼 수 있다.

1. 자신의 뒤쪽을 가리키는 방향벡터 : -1 * transform.forward
2. 자신의 왼쪽을 가리키는 방향벡터 : -1 * transform.right
3. 자신의 아래쪽을 가리키는 방향벡터: -1 * transform.up

**벡터 연산을 활용한 평행이동**

위의 변수들을 활용해 평행이동을 translate() 메서드를 사용하지 않고 구현할 수 있다.

```
transform.Translate(new Vector3(0, 1, 0));
transform.position = transform.position + transform.up * 1;
```

위의 각 줄의 코드는 똑같은 효과를 내는 코드이다

전역 공간에 대해 평행이동을 하고 싶다면

```
transform.Translate(new Vector3(0, 1, 0), Space.World);
transform.position = transform.position + Vector3.up * 1;
```

위의 코드는 똑같은 효과를 낸다.

transform 타입의 변수들은 자기 자신, 즉 오브젝트에 대한 방향벡터를 제공하고 Vector3 타입의 속기 변수들은 전역 공간에 대한 방향벡터를 제공하는 것이다!

## 요약

1. 전역 공간은 게임월드를 기준으로 한다.
2. 지역 공간은 부모 게임 오브젝트를 기준으로 한다.
3. 오브젝트 공간은 자기 자신을 기준으로 한다.
4. Inspector창에 표시되는 위치, 회전, 스케일 값은 지역공간에 대한 값이다.
5. Transform의 Translate() 메서드로 평행이동을 구현한다.
6. Transform의 Rotate() 메서드로 회전을 구현한다.
7. Translate(), Rotate()는 기본적으로 지역 공간을 기준으로 작동한다.
8. Translate(), Rotate() 메서드에 Space.World, Space.Self를 인자로 넣어 다른 공간에 대해 작동하게 할 수 있다.
9. Vector3.up 등의 속기를 이용하여 자주 사용되는 Vector3 방향벡터를 사용할 수 있다.
10. Transform 타입이 제공하는 여러 변수(transform.up 등)를 이용해 게임 오브젝트의 방향을 쉽게 접근하고 활용할 수 있다.



