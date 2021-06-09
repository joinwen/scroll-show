## 安装

```
npm i scroll-show --save-dev
```

## 使用
- ### 基础
wrapped: 父元素

child: 子元素
```
scrollShow({
  wrapped: document.querySelector(".wrapped"),
  child: document.querySelector(".box")
})
```

- ### forward
提前多少像素，默认 0
```
scrollShow({
  wrapped: document.querySelector(".wrapped"),
  child: document.querySelector(".box"),
  forward: 100
})
```

- ### cb
回调函数,参数如下：

ele：进入视口的元素

res: true 进入 | false 进出

status: 1 | 2
```
  scrollShow({
  wrapped: document.querySelector(".wrapped"),
  child: document.querySelector(".box"),
  forward: 100,
  cb: (ele,res,status) => {
    if(res) {
      ele.style.color = "red";
    } else {
      ele.style.color = "black";
    }
  }
})
```
