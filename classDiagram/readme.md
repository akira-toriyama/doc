# UML クラス図

関係の強い順番

1. 実現（realization）
1. 継承（inheritance）
1. 構成（composition）
1. 集約（aggregation）
1. 関連（association）
1. 依存（dependency）

**依存（dependency）** は、注意が必要

## 実現（realization）

interfaceと実装の関係

```mermaid
classDiagram

IAnimal <|.. Animal

class IAnimal{
    <<interface>>
    +run()
}

class Animal{
    +run()
}
```
## 継承（inheritance）

親子関係

```mermaid
classDiagram

Animal <|-- Dog
```


## 構成（composition）

独立して存在できない関係

```mermaid
classDiagram

Home "1"*--"1..*" Room

class Home{
    +Room room
}

class Room{
    +number 面積
}
```

```mermaid
classDiagram

犬 "1"*--"1" しっぽ

class 犬{
    +しっぽ
}

class しっぽ{
    +string 色
}
```

## 集約（aggregation）

独立して存在できる関係

複数の「全体」インスタンスが、1つの「部分」インスタンスを共有する

```mermaid
classDiagram

三角 "1"o--"0..*" スタイル
円 "1"o--"0..*" スタイル

class 三角{
    -面積
}

class 円{
    -面積
}

class スタイル{
    -線の太さ
    -線の色
    -塗りつぶし
}
```

## 関連（association）

少し関係がある

```mermaid
classDiagram

先生 <--> 生徒

class 先生{
    +string name
}

class 生徒{
    +string name
}
```

## 依存（dependency）

なんらかの関係

```mermaid
classDiagram

男 <..> 女

class 男{
    +string name
}

class 女{
    +string name
}
```