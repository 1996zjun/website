// 拿到header头部和scrollToTop返回顶部按钮
const headerEl = document.querySelector("header");
const scrollToTop = document.querySelector(".scrollToTop");

// 窗口监听滑动事件
window.addEventListener("scroll",()=> {

    /* 固定导航和返回按钮的出现时机 */
    // 获取内容高度 getBoundingClientRect
    let height = headerEl.getBoundingClientRect().height;

    // window.pageYOffset(偏移量) 页面滑动距离 减去高度 大于800
    if(window.pageYOffset - height > 800){
        // header头部是否包含sticky类
        if(!headerEl.classList.contains("sticky")) {
            // 没有就添加
            headerEl.classList.add("sticky");
        }
    } else {
        // 删除sticky
        headerEl.classList.remove("sticky");
    }

    // 窗口滑动到2000 就显示 返回顶部按钮
    if(window.pageYOffset > 2000 ){
        scrollToTop.style.display = "block";
    } else {
        scrollToTop.style.display = "none"
    }


})


const glide = new Glide(".glide"); //选取.glide类
const captionsEl = document.querySelectorAll(".slide-caption");  //拿到大图片中的内容 

// mount加载之后  run结束之后
glide.on(["mount.after","run.after"],() => {
    const caption = captionsEl[glide.index];  //获取对应的caption index为对应的下标
    anime({
        targets:caption.children, //所有子内容及h1，h3，button
        opacity:[0,1], //内容由透明边不透明
        duration:400,
        easing: "linear",
        delay: anime.stagger(400, {start: 300}), //一次出现中间相差400毫秒  start为第一个出现前的300毫秒
        translateY:[anime.stagger([40,10]), 0]
        // stagger([起始，结束]) 均匀分配
    });
});

// run 结束之前
glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach(el => {
        el.style.opacity = 0;
    });
});

glide.mount(); //加载轮播组件


// 成功案例
const isotope = new Isotope(".cases",{
    layoutMode: "fitRows", //模式
    itemSelector: ".case-item" //选中的元素
});

//全部、web、移动、科研
const filterBtns = document.querySelector(".filter-btns");

filterBtns.addEventListener("click", e=>{
    console.log(e);
    let { target } = e;
    
    //拿到对应的过滤属性值 * web mobile science
    const filterOption = target.getAttribute("data-filter");
    if(filterOption){
        // 去除所有active
        document.querySelectorAll(".filter-btn.active").forEach(btn=>btn.classList.remove("active"));
        // 添加为选中的按钮 
        target.classList.add("active");

        //开始整理，过滤中选中的内容
        isotope.arrange({ filter: filterOption });
    }
})


// 关于我们--流程服务  滑动到到时动画展示
const staggeringOption = {
    delay: 300,
    distance: "50px",
    duration: 500,
    easing: "ease-in-out",
    origin: "bottom"
}

// ...staggeringOption 如果后面的interval 在里面有的话就修改没有的话 就重新添加上去
ScrollReveal().reveal(".feature", { ...staggeringOption, interval: 350});
ScrollReveal().reveal(".service-item", {...staggeringOption, interval: 350} );



const dataSectionEl = document.querySelector(".data-section");
// 代码 奖项 客户...
ScrollReveal().reveal(".data-section", {
    beforeReveal: ()=>{
        anime({  //anime控制html动画库
            // 要操作的元素
            targets: ".data-piece .num",
            // 里面的文本
            innerHTML: el=> {
                return [0, el.innerHTML]; //从0开始增长
            },
            duration: 2000,
            round:1,  //数字按整数增长
            easing: "easeInExpo" //动画越来越快
        });

        // 初始化 背景滑动图片显示区域
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${dataSectionEl.getBoundingClientRect().bottom / 5}px)`
    }
});


// data-section 滑动
window.addEventListener("scroll", ()=>{
    const bottom = dataSectionEl.getBoundingClientRect().bottom;
    const top = dataSectionEl.getBoundingClientRect().top;
    if(bottom >= 0 && top <= window.innerHeight) {
        //滑动区域背景图片滑动
        dataSectionEl.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`;
    }
});

// 点击导航链接 平滑滑动
const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]', {
    header: "header",
    offset: 80  //顶部偏移80
});

//屏幕缩小后 点击菜单栏出现的nav 点击对应导航 滑动开始后 关闭导航
document.addEventListener("scrollStart", ()=>{
    if(headerEl.classList.contains("open")) {
        headerEl.classList.remove("open");
    }
});


// 探索更多 按钮
const exploreBtnEls = document.querySelectorAll(".explore-btn");
exploreBtnEls.forEach(exploreBtnEl => {
    // 每个按钮添加点击事件   处理函数 滑动到about-us处
    exploreBtnEl.addEventListener("click", ()=>{
        scroll.animateScroll(document.querySelector("#about-us"));
    })
})


// 折叠按钮 用于切换header菜单显示影藏
const burgerEl = document.querySelector(".burger");
burgerEl.addEventListener("click", ()=> {
    headerEl.classList.toggle("open");
})

