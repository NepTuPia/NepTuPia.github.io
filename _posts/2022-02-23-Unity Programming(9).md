# 탄막 슈팅 게임'닷지' - 최종 완성

---

앞에서 게임의 구성요소들을 완성했다. 이제는 UI를 만들고, 게임의 규칙을 관리하고 게임오버 상태를 표현하는 게임 매니저를 만들 것이다. 그리고 남은 게임 요소를 완성하고 게임을 빌드하여 닷지를 최종 완성해보자.

1. 게임 매니저와 UI 제작
2. 씬 관리자로 씬을 로드하는 방법
3. PlayersPrefs를 사용해 데이터를 저장하는 방법
4. 게임을 빌드하는 방법

위의 내용들을 다룰 것이다. 

## 프로젝트 정리

현제 Asset들이 아무렇게나 위치해 있다. 이를 각각의 종류에 맞게 분류하는 작업을 해보자. 에셋들이 위치한 폴더를 바꾸고 분류한다고해서 게임과 씬에 영향을 미치지 않는다. 마음 편히 정돈하여 게임을 제작해 나가자!

<p align = "center">
<img width="875" alt="image" src="https://user-images.githubusercontent.com/68016394/155346825-0af4fc19-d768-4026-9636-1484b83553e9.png">
종류별로 개별 폴더에 정리된 에셋들
</p>

위의 그림처럼 폴더를 생성하고 에셋들을 종류에 맞게 정리해주자. "Materials", "Scripts", "Prefabs" 3 종류의 폴더를 만들고 에셋들을 분류해줬다. 이렇게 작업해도 씬과 오브젝트, 게임에는 전혀 영향을 미치지 않으니 걱정하지 말자!

## 바닥 회전

플레이어 아래의 바닥을 회전시켜 게임을 더 역동적이고 어렵게 만들 수 있다. 회전하는 스크립트를 작성한 뒤 바닥 오브젝트인 Level 오브젝트에 적용시켜보자. 

**Ratator 스크립트 준비**

게임 오브젝트를 일정 속도로 회전시키는 Rotator 스크립트를 준비하자

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Rotator : MonoBehaviour
{
    public float rotationSpeed = 60f;

    void Update()
    {
        transform.Rotate(0f, rotationSpeed, 0f);
    }
}
```

Update() 메서드에 transform

자 이렇게 코드를 작성하고 Level 오브젝트에 스크립트를 적용시켜보자. Level 하위에 있는 plane이 아니라 Level 자체에 스크립트를 컴포넌트로 넣어줘야한다. 그래야 Level의 하위 오브젝트들 전부가 회전한다!

그러고 실행시켜보면 말도안되는 화면을 볼 수 있다. 코드상으로 보면 rotationSpeed를 60f로 줬으므로 초당 60도의 회전을 의도했지만 Update() 메서드는 매 프레임마다 실행되므로 60fps를 기준으로 3600도를 1초에 회전하게 된다.

이처럼 단순 값을 파라미터로 주게 되면 컴퓨터의 성능, 즉 fps에 따라 프로그램이 다르게 작동하게 된다. 만약 1초에 60도를 돌아가게 코드를 작성했다면 유저가 fps를 2배 높이면 2배 더 빠르게 움직이거나 회전하게 되어 버그성 플레이가 가능하게 된다. 

이를 위해서 우리는 앞서 Time.deltaTime() 메서드를 사용했다. 이 메서드는 현제 컴퓨터의 프레임과 프레임 사이의 시간 간격을 리턴한다. 이를 이용하면 fps가 변하더라도 동일하게 작동하도록 코드를 작동할 수 있다.

예를들어 60fps라면 update() 메서드의 실행 주기는 1/60초이지만 120fps가 되면 실행 주기는 1/120초로 바뀐다. 만약에 회전 코드를

`
transform(0f, 1/60f, 0f)
`

로 작성하게 되면 60fps에서만 의도한대로 작동한다. 이럴때 Time.deltaTime()을 사용하면 어떤 프레임에서도 알맞게 사용할 수 있다. 이를 활용해 스크립트를 수정해보자.

```
public class Rotator : MonoBehaviour
{
    public float rotationSpeed = 60f;

    void Update()
    {
        transform.Rotate(0f, rotationSpeed * Time.deltaTime, 0f);
    }
}
```

Time.deltaTime은 프레임사이의 시간 간격을 반환한다. 현제 120fps라면 1/120을 반환하므로 update() 메서드 실행마다, 즉 매 프레임마다 60 * 1 / 200 = 0.5도 만큼 회전하게 되어 1초에 60도를 회전하는 코드가 된다. 어떤 프레임에서도 1초에 60도만큼 회전시킬 수 있는 것이다!

## 게임 UI 제작

이제 생존 시간, 게임오버, 최고 기록등을 표현할 수 있는 UI 제작법을 배워보자.

다른 게임제작 툴들은 UI를 게임의 오브젝트들과는 별개로 취급해 만들어야한다. 하지만 유니티에서는 UI들도 게임 내의 오브젝트로 취급하기 때문에 오브젝트를 만들고 다루듯이 사용할 수 있다

**생존시간 텍스트 제작**

총알을 피해 얼마나 살아남았는지 표시하는 UI를 만들자. 편집하기 쉽도록 2D로 화면을 바꾸고 편집해보자.

씬창에서 "2D"를 클릭하면 2D 모드로 바꿀 수 있다. 그 다음 Hierarchy > Create(+버튼) > UI > Text로 생성하자. 그렇다면 자동으로 Canvas 탭이 포커스되며 Text 오브젝트가 생성될 것이다.

<p align = "center">
<img width="1172" alt="image" src="https://user-images.githubusercontent.com/68016394/155485390-f9e78309-0a3a-413e-be1a-71d19a4e3553.png">
텍스트 UI 오브젝트 생성
</p>

텍스트 UI를 생성하니 3개의 오브젝트가 생성됬다. "Canvas", "Text", "EventSystem" 오브젝트가 생성되었다. 

UI 오브젝트들은 다른 게임 오브젝트들이 Transform 컴포넌트를 가지고 있듯이 Rect Transform 컴포넌트를 가지고 있다. 이 컴포넌트를 통해 위치를 조정할 수 있다.  

모든 UI 오브젝트들은 Canvas 오브젝트의 자식 오브젝트로 소속되어야한다. 즉 UI가 표시될 2차원 평면의 Canvas위에 UI들이 표시되도록 작동한다는 의미이다. Canvas 오브젝트는 일종의 액자고, UI들은 그 액자 안에 들어갈 그림인 것이다!

EventSystem 오브젝트는 유저와 UI간의 상호작용을 담당한다. 클릭, 드래그 등의 이벤트가 발생하면 해당 UI 오브젝트에 이벤트 메시지를 보내 유저와 상호작용할 수 있는 역할을 한다. 

**텍스트 배치**

UI 오브젝트들은 앵커프리셋을 이용해 정렬한다. 사용해서 생성한 텍스트 UI 오브젝트를 배치해보자. 

UI 오브젝트 배치에는 앵커(Anchor), 피벗(Pivot), 포지션(Position) 3개의 값을 조정해 UI 오브젝트를 배치할 수 있다. 앵커프리셋은 UI의 배치를 편리하게 해주는 도구 모음집이며 편리하게 주요 위치로 오브젝트를 바로 배치할 수 있다. Alt키를 눌러 스내핑(Snapping)을 활성화 해서 텍스트 오브젝트를 상단 중앙으로 이동시켜보자. 

<p align = "center">
<img width="1340" alt="image" src="https://user-images.githubusercontent.com/68016394/155489218-dad98ea4-fd14-4dd3-99b4-724dcc0ec18b.png">
앵커 프리셋을 활용해 텍스트 UI 배치
</p>

**텍스트 꾸미기**

생성한 텍스트 오브젝트의 Text 컴포넌트에서 텍스트 내용과 글 정렬을 바꿔주자. 내용을 "Time: 0"으로 바꾸고 Alignment를 이용해 텍스트를 가운데 정렬해주자. 색깔도 (255, 255, 255)로 흰색으로 변경해주자. 

그 후 Rect Transform 컴포넌트에서 Pos Y 값을 -30으로 조정해서 위치를 조금 내려주고 Text 컴포넌트에서 폰트사이즈를 키워주자. 그리고 Horizontal Overflow와 Vertical Overflow 항목도 Overflow로 변경해주자. 해당 옵션들은 텍스트 상자에 글자가 넘칠 때 어떻게 할지를 결정한다. 

Horizontal Overflow는 수평방향의 텍스트 처리를 담당한다.  Wrap으로 바꾸면 글자가 넘어가면 줄바꿈이 일어나고, Overflow로 설정하면 글자가 텍스트 상자를 넘어서도 그대로 출력된다. 

Vertical Overflow는 수직방향의 텍스트 처리를 담당한다. Truncate로 설정하면 글자가 넘어가면 자르고, Overflow 옵션은 넘어가는 글자를 그대로 출력한다. 

마지막으로 입체효과를 주자. Time Text 오브젝트에 컴포넌트를 추가하자. Add Component > UI > Effect > Shadow로 그림자 컴포넌트를 추가해주자. 

<p align = "center">
<img width="1357" alt="image" src="https://user-images.githubusercontent.com/68016394/155491350-9cb68a6c-9f9c-427a-ad83-11f2436f24b9.png">
경과 시간 텍스트 설정 완료
</p>

**최고 기록 텍스트와 게임오버 텍스트**

앞서 만들었던 Time Text 오브젝트를 재활용하자. 복제한 뒤 이름을 "Gameover Text"로 변경하고 "Press R to restart"를 텍스트 내용으로 설정한 뒤 앵커프리셋을 활용해 한가운데에 배치해주자. 

최고 기록 텍스트는 게임오버 텍스트를 복제한 뒤 게임오버 텍스트보다 아래에 위치하도록 설정해주고 글씨 크기를 줄인 뒤 생성해주자. 중요한 점은 최고 기록 텍스트 오브젝트는 게임오버 텍스트와 동시에 나타나야 하기에 Gameover Text 오브젝트의 자식 오브젝트로 만들어줘야 한다는 것이다. 

마지막으로, 게임오버텍스트와 최고기록 텍스트는 평소에는 보이지 않아야 한다. 그러므로 Inspector창에서 비활성화해주어 평소 화면에는 보이지 않도록 해주자. UI 오브젝트들의 세세한 작동은 스크립트 파일로 작동시킬 것이다.

<p align = "center">
<img width="1677" alt="image" src="https://user-images.githubusercontent.com/68016394/155492518-274ddba2-a141-4228-ac52-7dc247bdbd90.png">
게임오버와 최고기록 텍스트 생성 및 비활성화
</p>
