var store = [{
        "title": "Unity programming(1)",
        "excerpt":"Unity 시작하기  본 글은 “레트로의 유니티 게임 프로그래밍 에센스”를 따라가며 작성될 예정   시작해보자!      ","categories": [],
        "tags": [],
        "url": "/Unity-Programming(1)/",
        "teaser": null
      },{
        "title": "Unity programming(2)",
        "excerpt":"1. 유니티 인터페이스 기본적인 유니티 인터페이스 설정을 해보고 살펴보자 초기화면 셋팅 유니티 프로젝트를 열면 다음과 같은 모습이다. ㄹ 이제 우측 상단의 ‘Default’라고 되어 있는 부분을 클릭해서 ‘2 by 3’로 바꿔주고 ‘Project’ 탭을 ‘Hierarchy’ 탭 아래부분으로 이동하자. 그리고 상단 맥북 메뉴에서 Windows &gt; General &gt; Console을 눌러 콘솔창을 띄운 뒤 ‘Inspector’...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(2)/",
        "teaser": null
      },{
        "title": "First post",
        "excerpt":"Hello   It’s my first post   -   Here will be my footprints and what I did before   Nice to meet you!  ","categories": [],
        "tags": [],
        "url": "/first-post/",
        "teaser": null
      },{
        "title": "게임 개발 개요 정리글",
        "excerpt":"1. 게임 기술 정리글     https://www.itfind.or.kr/WZIN/jugidong/1192/119206.htm  ","categories": [],
        "tags": [],
        "url": "/%EA%B2%8C%EC%9E%84-%EA%B0%9C%EB%B0%9C-%EA%B0%9C%EC%9A%94-%EC%A0%95%EB%A6%AC%EA%B8%80/",
        "teaser": null
      },{
        "title": "Unitiy programming(3)",
        "excerpt":"2. 상속과 컴포넌트 유니티는 기본적인 객체지향(OOP)의 특성인 상속과 게임 오브젝트 구성을 위해 상속보다 더 효과적인 컴포넌트 패턴이라는 것을 지원한다. 상속 일반적인 객체지향에서의 상속과 동일하다. 부모클래스의 메소드와 필드를 자식개체가 물려받아 활용할 수 있다. 다만 Human 클래스를 만들어 이를 바탕으로 다양한 NPC를 만들고 몬스터 오브젝트를 만들려고 하면 인간 종족이 아닌 슬라임, 늑대인간...","categories": [],
        "tags": [],
        "url": "/Unitiy-Programming(3)/",
        "teaser": null
      },{
        "title": "Unity programming(4)",
        "excerpt":"5. 게임 오브젝트 제어하기 객체지향을 이용해 클래스와 오브젝트(객체)를 다뤄보자 클래스와 오브젝트 게임내에서의 지형, NPC, 몬스터 하나하나는 오브젝트(객체)다. 그리고 이 오브젝트들은 클래스를 통해 하나씩 생성되어 게임 내에서 사용된다. 즉 객체지향과 동일하다. 같은 클래스에서 찍어낸 각각의 오브젝트는 물론 다른 클래스에서 나온 오브젝트끼리는 독립성을 지닌다. 한 오브젝트가 어떤 행동할 하거나 죽는 것이 다른...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(4)/",
        "teaser": null
      },{
        "title": "Unity programming(5)",
        "excerpt":"탄막 슈팅 게임 ‘닷지’ - 플레이어 제작 레벨 및 카메라 설정 1. 바닥 제작 Hierarchy &gt; Create &gt; 3D object &gt; Plane으로 기본이 될 바닥을 만들자 Inspector창에서 Transform 컴포넌트의 Position에서 평면의 위치를 조정할 수 있다. 기본 원점인 (0, 0, 0)으로 셋팅해두자. 평면 생성 및 원점에 셋팅 2. 가로와 세로길이를 두...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(5)/",
        "teaser": null
      },{
        "title": "Unity programming(6)",
        "excerpt":"탄막 슈팅 게임 ‘닷지’ - 플레이어 제작(2) 플레이어 제작 플레이어 사망 처리 이제 플레이어 사망 처리를 할 Die() 메서드를 만들어보자. Die() 메서드는 자신의 게임 오브젝트를 비활정화하는 메서드이다. 이 메서드는 탄알과 플레이어가 충돌했을 때 실행될것이다. Die() 메서드는 PlayerController 스크립트가 스스로 실행하지 않는다. 플레이어에게 부딪힌 탄알이 Player Coltroller 스크립트에 접근하여 실행시킬것이며 그러므로...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(6)/",
        "teaser": null
      },{
        "title": "Unity programming(7)",
        "excerpt":"탄막 슈팅 게임 ‘닷지’ - 탄알 제작 앞에서 레벨과 플레이어 게임 오브젝트를 만들고 조작할 수 있도록 설정을 마쳤다. 이제 탄알 게임 오브젝트를 완성하고, 탄알 생성기로 탄알을 주기적으로 생성해 플레이어와 상호작용할 수 있도록 만들자 탄알 게임 오브젝트 준비 게임에서 탄알은 생성된 후 앞쪽으로 일정 속도로 날아가며, 어떤 게임 오브젝트와 충돌했을 때...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(7)/",
        "teaser": null
      },{
        "title": "Unity programming(8)",
        "excerpt":"탄막 슈팅 게임 ‘닷지’ - 탄알 제작 탄알 생성기 준비 탄알 오브젝트가 준비되었으므로 탄알 생성기를 만들어보자. 탄알 생성기 게임 오브젝트는 랜덤한 시간 간격으로 탕알을 생성해 플레이어를 향해 발사한다. 탄알 생성기의 기능은 다음과 같다. 붉은 원기둥 모양 랜덤한 시간 간격으로 탄알 생성 Bullet 프리팹을 원본으로 탄알을 생성 플레이어를 향하도록 탄알을 생성...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(8)/",
        "teaser": null
      },{
        "title": "Unity programming(9)",
        "excerpt":"탄막 슈팅 게임’닷지’ - 최종 완성 앞에서 게임의 구성요소들을 완성했다. 이제는 UI를 만들고, 게임의 규칙을 관리하고 게임오버 상태를 표현하는 게임 매니저를 만들 것이다. 그리고 남은 게임 요소를 완성하고 게임을 빌드하여 닷지를 최종 완성해보자. 게임 매니저와 UI 제작 씬 관리자로 씬을 로드하는 방법 PlayersPrefs를 사용해 데이터를 저장하는 방법 게임을 빌드하는 방법...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(9)/",
        "teaser": null
      },{
        "title": "Unity programming(10)",
        "excerpt":"탄막 슈팅 게임’닷지’ - 최종 완성 앞서서 UI까지 제작을 완료했다. 이제 이 UI들과 게임을 전반적으로 관리할 게임매니저를 제작해보자. 게임매니저 제작 게임의 규칙과 게임오버 상태, 생존 시간 등의 수치를 관리하고, 게임 UI를 갱신하는 게임 매니저(Game Manager)를 만들어보자. 닷지 게임에서 게임매니저는 다음과 같은 기능을 한다. 게임오버 상태 표현 생존 시간 갱신 UI를...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(10)/",
        "teaser": null
      },{
        "title": "Unity programming(11)",
        "excerpt":"9장, 10장을 들어가기 전… 게임 월드에서 모든 오브젝트는 위치와 회전을 가진다. 그리고 ‘공간’은 오브젝트들을 담는 틀이면서, 오브젝트를 배치할 때 사용하는 위치와 회전을 측정하는 기준을 제공한다. 어떤 오브젝트의 위치와 회전을 측정하는 기준은 상황에 따라 다르게 적용된다. ‘절대적인 원점’에서의 위치와 회전일 수도 있고 오브젝트끼리의 ‘상대적인’ 위치와 회전일 수도 있다. 그리고 공간에서 이동하는...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(11)/",
        "teaser": null
      },{
        "title": "Unity programming(12)",
        "excerpt":"벡터 앞의 글에서 말한 대로 이번에는 책으로는 9장의 내용이다. 유니티에서 벡터에 대한 기본적인 개념과 수학적 개념들, 그리고 쿼터니언에 대해 배워보자. 1. 벡터의 절대 위치와 상대 위치 벡터는 우리가 좌표상으로 인식하는 그 벡터를 의미한다. (0, 0)이라면 x, y좌표가 각각 0이라는 의미이다. 다만 (1, 1)이라는 벡터를 예로 들면 이 벡터는 2가지의 의미를...","categories": [],
        "tags": [],
        "url": "/Unity-Programming(12)/",
        "teaser": null
      }]
