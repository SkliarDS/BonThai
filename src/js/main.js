
// Проверка поддержки webp
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
// Добавление класса _webp или _no-webp для HTML
testWebP(function (support) {
    let className = support === true ? 'webp' : 'no-webp';
    document.documentElement.classList.add(className);
});

document.addEventListener("DOMContentLoaded", function(){
    /* init Libs */ 
    // var lazyLoadInstance = new LazyLoad({});

    // AOS.init({
    //     duration: 1000,
    //     delay: 400,
    //     offset: 100,
    // });

    // var rellax = new Rellax('.rellax', {
    //     speed: 10,
    //     center: true,
    //     wrapper: null,
    //     round: true,
    //     vertical: true,
    //     horizontal: false
    // }); 
    /* /init Libs*/

    const navIcon = document.querySelector('.nav-icon');
    const mobMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('#overlay');    
    const main = document.querySelector('.main');    
    const header = document.querySelector('.header');    
    const bodyEl = document.body;
    let header_height = header.offsetHeight;

    
    navIcon.addEventListener('click', function () {
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });

    
    mobMenu.addEventListener('click', function(){
        this.classList.remove('active');
        navIcon.classList.remove('active');
        overlay.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });
       
        overlay.addEventListener('click', function(){
        this.classList.remove('active');
        navIcon.classList.remove('active');
        mobMenu.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });  

    let links = document.querySelectorAll('[data-link]');
    links.forEach(link => {
        link.addEventListener('click', (e) =>{
            e.preventDefault();
            let nextEl = link.nextElementSibling;
            nextEl.classList.toggle('active');
        });
    });

     /* Показ/скрытие блоков */ 
     function look_more(btnSelector, hidden_element) {
        const btns = document.querySelectorAll(btnSelector);
    
        function handle_button_click(e) {
            const btn = e.currentTarget;
            const btn_content_text = btn.dataset.lookMoreBtn;
           
            if (!handle_button_click.initialText) {
                handle_button_click.initialText = btn.textContent;
            }
    
            const hidden_elems = document.querySelectorAll(hidden_element); 
            hidden_elems.forEach(elem => {
                elem.classList.toggle('js-active');
            });
    
            const anyElemActive = Array.from(hidden_elems).some(elem => elem.classList.contains('js-active'));               
            btn.textContent = anyElemActive ? btn_content_text : handle_button_click.initialText;
            if(!anyElemActive){
                btn.scrollIntoView({ behavior: 'smooth', block: "center", inline: "start" });
            }
            btn.classList.toggle('active', anyElemActive);
        };
    
        btns.forEach(btn => {
            btn.addEventListener('click', handle_button_click);
        });
    };
  
    look_more('.product__tech-btn', '.technical-list .--none');    // указываем класс кнопки
    look_more('.product-detail__btn', '.product-detail__cards .--none');    
    /* / Показ/скрытие блоков */

    /* Скрытие текста */ 
    function see_more_texts(text, lines_limit_selector, parent){

        const texts = document.querySelectorAll(text);
        if (texts) {            
            texts.forEach(text => {
                const btn = text.nextElementSibling;
                const btn_content = btn.firstElementChild;
                const btn_content_text = btn_content.dataset.lookMoreBtnContent;
                const btn_content_text_default = btn_content.textContent;
                btn.addEventListener('click', function() {
                    this.classList.toggle('active');
                    text.classList.toggle(lines_limit_selector);
                    !text.classList.contains(lines_limit_selector) ? btn_content.textContent = btn_content_text : btn_content.textContent = btn_content_text_default;
                    
                    text.closest(parent).classList.toggle('active');
                    text.closest(parent).previousElementSibling.classList.toggle('active');
                });
            });
        };
    };
    if(window.innerWidth <= 1000) {
        see_more_texts('.advantages-card__text', 'advantages-card__text--hidden', '.advantages-card__desc');
    }
    /* /Скрытие текста */ 

    /* фиксированная шапка */
    let lastScrollTop = 0;
    const scrollHeaderFixed = () => {
        let scrollDistance = window.scrollY;      
        if (scrollDistance > headerHeight) {
            header.classList.add('header--fixed');
            main.style.paddingTop = `${headerHeight}px`;
        } else {
            header.classList.remove('header--fixed');
            main.style.paddingTop = null;            
        }
        lastScrollTop = scrollDistance;
    }; 
    
    function header_fixed() {
        var currentScroll = window.scrollY || document.documentElement.scrollTop;       
        
        if (currentScroll > lastScrollTop){
            header.classList.remove('header--fixed');
            main.style.paddingTop = `${0}px`;
        } else {
            main.style.paddingTop = `${header_height}px`;
            header.classList.add('header--fixed');
        }
        if(currentScroll == 0){
            header.classList.remove('header--fixed');
            main.style.paddingTop = `${0}px`;
        }
        lastScrollTop = currentScroll;
    };

    window.addEventListener('scroll', () => { 
        // scrollHeaderFixed();
    });
    /* /фиксированная шапка */

    /* Слайдер */    
    const swiper = new Swiper('.aaa__swiper', {       
        
        loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        clickable: true,
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
            //   spaceBetween: 20
            },
            380: {
              slidesPerView: 1,
            //   spaceBetween: 20
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30
            },
            
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
    });
    /* /Слайдер */ 

    /* Слайдер */    

    let slider1 = document.querySelector('.article__images')
    let  articleSwiper;
    if(slider1){
        function mobileSlider1(){
            if(window.innerWidth <= 768 && slider1.dataset.mobile =='false'){
                articleSwiper = new Swiper(slider1, {       
                    // loop: true,
                    slidesPerView: 3,
                    spaceBetween: 20,
                    // If we need pagination
                    
                    breakpoints: {
                        // when window width is >= 320px
                        320: {
                          slidesPerView: 1,
                        //   spaceBetween: 20
                        },
                        380: {
                          slidesPerView: 1,
                        //   spaceBetween: 20
                        },
                        // when window width is >= 480px
                        768: {
                          slidesPerView: 2,
                          spaceBetween: 20
                        },
                        
                        
                    },
                    
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    
                });
                slider1.dataset.mobile ='true'
            };
            if(window.innerWidth > 768) {
                slider1.dataset.mobile ='false';
                if(slider1.classList.contains('swiper-container-initialized')){
                    articleSwiper.destroy();
                }
                
            }
        }
        mobileSlider1();
    
        window.addEventListener('resize', () => {
            mobileSlider1();
        });
    }
    /* /Слайдер */ 

    /* Слайдер */ 
    const aboutSwiper = new Swiper('.about__swiper', {        
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,        
        pagination: {
            el: '.swiper-pagination',
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },       
        
    });
    /* /Слайдер */ 


    /* Слайдер */ 
    let sb = document.querySelectorAll('.hero__swiper'); 
    if(sb){
        sb.forEach(item => {
            let sliderBig = new Swiper (item,{
                slidesPerView: 1,
                observer: true,
                observeParents: true,
                observeSlideChildren: true,
                nested: true,
                pagination: {
                    el: '.hero__pagination',
                },
                
            }); 
            let swiperItems = item.querySelectorAll('.hero__thumb'); /* добавление активного класса миниатюре при перелистованиии большого слайда */ 
            sliderBig.on('slideChange', function () {
                let activeSlideIndex = sliderBig.activeIndex;
                swiperItems.forEach(el => {
                    el.classList.remove('active');
                    swiperItems[activeSlideIndex].classList.add('active');
                });
            });     
            swiperItems.forEach((el, index)=>{ /* клик по мениатюре для перелистованиии большого слайда */ 
                el.dataset.card = index;
                el.addEventListener('click', (e)=> {
                    let index = e.currentTarget.dataset.card;
                    sliderBig.slideTo(index);  
                    swiperItems.forEach(item => item.classList.remove('active'));           
                    el.classList.add('active');
                });
            });
        });   
    };                     
    /* /Слайдер */ 

    /* Слайдер */ 
    const examplesSwoperBtns = new Swiper ('.examples-slider__btns',{
        
        spaceBetween: 15,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
    })
    const examplesSwiper = new Swiper('.examples-slider__container', {           
       
        slidesPerView: 1,
        // spaceBetween: 10,
        thumbs: {
            swiper: examplesSwoperBtns,
        },
        
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },       
        
    });
    /* /Слайдер */ 
    
     
    /* Табы */
    let tabBlock = document.querySelectorAll('[data-tabs]');

    tabBlock.forEach(element => {
        let tabsParent = element.querySelector('ul');
        let tabs = tabsParent.querySelectorAll('li');
        let tabsContent = element.querySelectorAll('[data-tabs-content]');
        
        
        tabHideContent();
        tabShowContent();

        tabs.forEach((element, i) => {              
            element.addEventListener('click', function(){
                tabHideContent();
                tabShowContent(i);
            });          
            
        });

        function tabHideContent() {
            tabs.forEach(element => {
            element.classList.remove('active');
            });

            tabsContent.forEach(element => {
            element.classList.remove('active');
            });
        }

        function tabShowContent(i = 0) {
            tabs[i].classList.add('active');
            tabsContent[i].classList.add('active');
        }
    });
    /* /Табы */
    
    

    /* аккордеон */    
    // const accordeon = document.querySelectorAll("[data-accordion]");
    // accordeon.forEach(function (item) {
    //     const parent = item.closest('[data-accordion-parent]');  
    //     const hidden_element = item.nextElementSibling;
    //     item.addEventListener('click', function() {
    //         parent.classList.toggle('active');                                  
    //         hidden_element.classList.toggle('active'); 
    //         item.classList.toggle('active'); 
    //         if(hidden_element.classList.contains('active')){
    //             hidden_element.style.maxHeight = hidden_element.scrollHeight + 'px';                  
    //         } else {
    //             hidden_element.style.maxHeight = null;
    //         }
    //     });
    // });
    /* /аккордеон */   

    /* аккордеон GRID */    
    const accordeons = document.querySelectorAll("[data-accordion]");
    accordeons.forEach(function (item) {
        const parent = item.closest('[data-accordion-parent]');  
        const hidden_element = item.nextElementSibling;
        item.addEventListener('click', function() {
            parent.classList.toggle('active');                                  
            hidden_element.classList.toggle('active'); 
            item.classList.toggle('active'); 
        });
    });
    /* /аккордеон */ 

    /* аккордеон на мобилке */
    const accordeonMob = document.querySelectorAll("[data-accordion-mob]");
    if(accordeonMob !== null && window.innerWidth < 575){
        accordeonMob.forEach(function (item) {
            let plus = item.querySelector('[data-check]');
            item.addEventListener('click', function() {
                let self = this.nextElementSibling;
                self.classList.toggle('js-visible');                                
                plus.classList.toggle('show');
                if(self.classList.contains('js-visible')){
                    self.style.maxHeight = self.scrollHeight + 'px';                  
                } else {
                    self.style.maxHeight = null;
                }
            });
        });
    };
    /* /аккордеон на мобилке */

    /* скролл на верх */

    //  let scrollTop = document.querySelector('.scroll-top');
    //  window.onscroll = () => {
    //      if (window.scrollY > 700) {
    //          scrollTop.classList.remove('scroll-top--hide');
    //      }
    //      else if (window.scrollY < 700) {
    //          scrollTop.classList.add('scroll-top--hide');
    //      }
    //  };
    
    //  при нажатии скролится вверх на JS
    //  scrollTop.onclick = () => {
    //      window.scrollTo(0, 0);
    //  }; 
     /* /скролл на верх */

    /* отправка формы PHPMailer */

    // const telSelector = document.querySelectorAll('input[type="tel"]');
    // const inputMask = new Inputmask('+7 (999) 999-99-99');
    // inputMask.mask(telSelector);

    const forms = document.querySelectorAll('.form');

    forms.forEach(function(form){
        
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            console.log('Submit');
        
            const formData = new FormData(form);
        
            async function fetchData() {            
                const url = "./mailer.php";            
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                const result = await response.text();
                console.log(result);   
                
                if (result === 'SUCCESS') {                              
                    let answers = document.querySelectorAll('.success');  
                    answers.forEach(function(answer){
                        answer.hidden = false;
                    });                   
                    // form.style.cssText = `height: 0; opacity: 0;`;
                    form.style.display = 'none';
                    reloadWin();  
                } else {                    
                    let answersErrors = document.querySelectorAll('.error');  
                    answersErrors.forEach(function(error){
                        error.hidden = false;
                    });           
                }                
                form.reset();
            }
            fetchData();
        });
    });       
    /* /отправка формы PHPMailer */
    
    //=======================================форма с кастомной валидацией валидация =================================

    // Если валидировать несколько форм на странице то каждой форме отдельный класс	
    // new window.JustValidate('.form', {
    //     rules: {
    //         Телефон: {
    //         required: true,
    //         function: () => {
    //         const phone = telSelector.inputmask.unmaskedvalue();
    //         return Number(phone) && phone.length === 10;
    //         }
    //         },
    //         Имя: {
    //             required: true,
    //         },		
    //     },
    //     colorWrong: '#ff0f0f',
    //     messages: {
    //         Имя: {
    //             required: 'Введите имя',
    //             minLength: 'Введите 2 и более символов',
    //             maxLength: 'Запрещено вводить более 15 символов'
    //         },		
    //         email: {
    //             email: 'Введите корректный email',
    //             required: 'Введите email'
    //         },
    //         Телефон: {
    //             required: 'Введите телефон',
    //             function: 'Здесь должно быть 10 символов без +7'
    //         }
    //     },
    //     submitHandler: function(form) {
    //         console.log(form);
    //         let formHeight = form.scrollHeight;
    //         form.style.height = `${formHeight}px`;			
    //         const formData = new FormData(form);
        
    //         async function fetchData() {			
    //             const url = "./mailer.php";			
    //             const response = await fetch(url, {
    //                 method: 'POST',
    //                 body: formData,
    //             });
    //             const result = await response.text();
    //             console.log(result);
                
    //             if (result === 'SUCCESS') {                              
    //                 let answers = document.querySelectorAll('.success');  
    //                 answers.forEach(function(answer){
    //                     answer.hidden = false;
    //                 });                   
    //                 form.style.cssText = `height: 0; opacity: 0;`;
    //             } else {
    //                 document.getElementById('error').hidden = false;            
    //             }			
    //             form.reset();
    //         }
    //         fetchData();
            
    //     }
    // });
    
    

    /* кнопка вкл видео  */    
    const videos = document.querySelectorAll('.video-id');
    if(videos !== null){
        videos.forEach(item => {
            const video = item.querySelector('video');
            
            const videoBtn = item.querySelector('.video-btn');
            videoBtn.addEventListener('click', function(){
                video.controls = 'controls';
                if(video.paused){
                    video.play();
                    videoBtn.classList.add('video-hidden');
                } else {
                    video.pause();
                    videoBtn.classList.remove('video-hidden');
                }
                
            });
        });

        let dataVideo = document.querySelector('[data-video]');
        if(dataVideo) {
            dataVideo.addEventListener('click', (e)=>{
                e.currentTarget.style.display = 'none';          
                
            });
        }; 
    };
    /* /кнопка вкл видео  */

    /* темная тема */   
    const themes = document.querySelectorAll('.theme');
    const html = document.querySelector('html');
    const themeImg = document.querySelector('.theme img');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {    
        themeImg.style.display = 'none';
    }    
    if (localStorage.getItem('theme') === 'dark') {
        console.log('ffff');
    }
    themes.forEach(theme => {
        theme.addEventListener('click', function(){
        
            if(localStorage.getItem('theme') === 'dark'){
                localStorage.removeItem('theme');
            }else {
                localStorage.setItem('theme', 'dark');
            }
            addDarkClassHtml();
        });
    });


    function addDarkClassHtml() {
        
        try {
            if(localStorage.getItem('theme') === 'dark') {
                html.classList.add('dark');            
                themeImg.src = './img/icons/sun.svg';
            }
            else {
                html.classList.remove('dark');            
                themeImg.src = './img/icons/moon.svg';
                
            }
        } catch (err){}
    }
    addDarkClassHtml();
    /* темная тема */

    /* Плавный скролл  */  
    // const anchorsNames = document.querySelectorAll('[data-name-anchor]'); 
    // anchorsNames.forEach(function(anchor){ 
    //     anchor.addEventListener('click', function(e){  
    //         e.preventDefault();           
    //         const blockId = anchor.dataset.nameAnchor;            
    //         let block = document.querySelector(`#${blockId}`);
    //         console.log("anchor.addEventListener  block", block)
    //         block.classList.add('anchor');
    //         block.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'start'                
    //         });                     
            
    //     });
    // });
    const anchorsNames = document.querySelectorAll('[data-name-anchor]'); 
    anchorsNames.forEach(function(anchor){ 
        anchor.addEventListener('click', function(e){  
            e.preventDefault();           
            const blockId = anchor.dataset.nameAnchor;            
            let block = document.querySelector(`#${blockId}`);
            const elementPosition = block.getBoundingClientRect().top;
            const offsetPosition = elementPosition - header_height;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });                    
            
        });
    });
    /* /Плавный скролл  */

   

});

    


