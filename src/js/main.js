
// const svgUses = document.querySelectorAll('use');
// svgUses.forEach(use => {
//     console.log("use:", use.getAttribute('href'))
//     let link_icon = use.getAttribute('href');
    
//     use.setAttribute('href', link_icon + '?v=' + new Date().getTime());
//     console.log('use:',use);
// })

document.addEventListener("DOMContentLoaded", function(){
    /* init Libs */ 
    var lazyLoadInstance = new LazyLoad({});

    function check_width_window(width){
        return window.innerWidth <= width;
    }

    const navIcon = check_width_window(576) ? document.querySelector('.nav-icon.--mobile') : document.querySelector('.nav-icon.--pc');
    const mobMenu = document.querySelector('#mobile-menu');   
    const mobAddress = document.querySelector('#mobile-address');   
    const btn_open_address = document.querySelectorAll('[data-btn-open-address]');   
    const main = document.querySelector('.main');    
    const header = document.querySelector('.header');    
    const nav = document.querySelector('.nav');    
    const bodyEl = document.body;
    let header_height = header.offsetHeight;

    
    navIcon.addEventListener('click', function () {
        this.classList.toggle('active');
        mobMenu.classList.toggle('active');
        bodyEl.classList.toggle('noscroll');
    });
    
    mobMenu.addEventListener('click', function(){
        this.classList.remove('active');
        navIcon.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    btn_open_address.forEach(btn => {
        btn.addEventListener('click', function () {
            this.classList.toggle('active');
            mobAddress.classList.toggle('active');
            bodyEl.classList.toggle('noscroll');
        });
    })
    
    mobAddress.addEventListener('click', function(e){
        this.classList.remove('active');
        bodyEl.classList.remove('noscroll');
    });

    document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape') {
			mobAddress.classList.remove('active');
			mobMenu.classList.remove('active');
            navIcon.classList.remove('active');
            // btn_open_address.classList.remove('active');
            bodyEl.classList.remove('noscroll');
		}
	});

    /* смена блоков на первом экране: слайдер vs поиск */ 
    const blog_header = document.querySelector('.blog__header');
    const btn_open_search = document.querySelector('.js-open-search');
    const btn_close_search = document.querySelector('.js-close-search');

    btn_open_search ? btn_open_search.addEventListener('click', (e)=>change_header_row(e)) : null;
    btn_close_search ? btn_close_search.addEventListener('click', (e)=>change_header_row(e)) : null;
    function change_header_row(e){
        blog_header.querySelector('.blog__header-row.--hidden').classList.remove('--hidden');
        e.target.closest('.blog__header-row').classList.add('--hidden');
    };
    /* / смена блоков на первом экране: слайдер vs поиск */ 

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
    if(check_width_window(576)){
        main.style.paddingTop = `${header_height}px`;
    }
    const scrollHeaderFixed = () => {
        let scrollDistance = window.scrollY;      
        if (scrollDistance > header_height) {
            nav.classList.add('--fixed');
            let nav_height = nav.offsetHeight;
            main.style.paddingTop = check_width_window(576) ? `${header_height}px` : `${nav_height}px`;
        } else {
            nav.classList.remove('--fixed');
            main.style.paddingTop = main.style.paddingTop = check_width_window(576) ? `${header_height}px` : null;            
        }
        lastScrollTop = scrollDistance;
    }; 
    /* /фиксированная шапка */

    /* Слайдер */    
    const swiper = new Swiper('.slider__swiper', {       
        
        // loop: true,
        slidesPerView: 3,
        spaceBetween: 30,
        clickable: true,
        pagination: {
            el: '.slider__pagination',
        },
        breakpoints: {
            320: {
              slidesPerView: 1.2,
              spaceBetween: 20
            },
            375: {
              slidesPerView: 1.3,
              spaceBetween: 10
            },
            425: {
              slidesPerView: 1.5,
              spaceBetween: 10
            },
            576: {
              slidesPerView: 2.2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            1200: {
              slidesPerView: 3.4,
              spaceBetween: 20
            },
            1360: {
              slidesPerView: 4.2,
              spaceBetween: 20
            },
            
        },
        // scrollbar: {
        //   el: '.swiper-scrollbar',
        // },
    });   
    new Swiper('.info-cards__swiper', {  
        clickable: true,
        pagination: {
            el: '.info-cards__pagination',
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            375: {
                slidesPerView: 1.16,
                spaceBetween: 10
            },
            425: {
                slidesPerView: 1.3,
                spaceBetween: 10
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            768: {
              slidesPerView: 2.6,
              spaceBetween: 10
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            
        },
    });   

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

    new Swiper('.gift__swiper', {        
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,        
        pagination: {
            el: '.gift__pagination',
        },   
        breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            425: {
              slidesPerView: 2,
              spaceBetween: 10
            },
            576: {
              slidesPerView: 3,
              spaceBetween: 20
            },
            992: {
              slidesPerView: 4,
              spaceBetween: 50
            },
            
        },  
        
    });
    
    new Swiper('.atmosphere__swiper', {        
        // loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        pagination: {
            el: '.atmosphere__pagination',
        }, 
        
    });
    new Swiper('.blog__tab', {        
        // loop: true,
        slidesPerView: "auto",
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        observeSlideChildren: true,
        
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
                direction: 'vertical',
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
    const spa_slider = new Swiper('.spa-slider__swiper', {           
       
        slidesPerView: 1,
        effect: 'fade',
        loop: true,
        pagination: {
            el: '.spa-slider__pagination',
            type: 'fraction'
        },
        navigation: {
            nextEl: '.spa-slider__next',
            prevEl: '.spa-slider__prev',
        }, 
        breakpoints: {
            320: {
                autoHeight: true,
            },
            769: {
                autoHeight: false,
            },
            
        },        
        
    });
    document.querySelectorAll('.spa-slide__icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');
            spa_slider.slideTo(slideIndex);
        });
    });
    
    document.querySelectorAll('.spa-slide__custom-content').forEach(button => {
        button.addEventListener('click', function() {
            const slideIndex = this.getAttribute('data-slide');
            spa_slider.slideTo(slideIndex);
        });
    });

    // document.querySelectorAll('.spa-slide__icon').forEach(button => {
    //     button.addEventListener('click', function() {
    //         const isAhead = this.classList.contains('ahead');
    //         const isBack = this.classList.contains('back');
    //         const slideIndex = this.getAttribute('data-slide');
    
    //         if (isAhead) {
    //             document.querySelectorAll('.spa-slide.swiper-slide').forEach(slide => {
    //                 slide.classList.add('ahead-active');
    //                 slide.classList.remove('back-active');
    //             });
    //         } else if (isBack) {
    //             document.querySelectorAll('.spa-slide.swiper-slide').forEach(slide => {
    //                 slide.classList.add('back-active');
    //                 slide.classList.remove('ahead-active');
    //             });
    //         }
    //         spa_slider.slideTo(slideIndex);
    //     });
    // });
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
            // f();
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

    const telSelector = document.querySelectorAll('input[type="tel"]');
    const inputMask = new Inputmask('+7 (999) 999-99-99');
    inputMask.mask(telSelector);

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
    

    /* кнопка вкл видео  */    
    const videos = document.querySelectorAll('.video-id');
    if(videos){
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



    /* АНИМАЦИИ */ 

    function isElementInViewport(el) { // определение положения элемента в окне браузера
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }  

    var tricksWord = document.getElementsByClassName("tricks");
    for (var i = 0; i < tricksWord.length; i++) {
        var wordWrap = tricksWord.item(i);
        wordWrap.innerHTML = wordWrap.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="tricksword">$2</span>');
    }

    var tricksLetter = document.getElementsByClassName("tricksword");
    for (var i = 0; i < tricksLetter.length; i++) {
        var letterWrap = tricksLetter.item(i);
        letterWrap.innerHTML = letterWrap.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    }

    var fadeside0 = anime.timeline({
        loop: false,
        autoplay: false,
    });
    fadeside0.add({
        targets: '.fadeside0 .letter',
        translateX: [40, 0],
        translateZ:[40, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 1500,
        delay: (el, i) => 10 + 100 * i
    });

    var miraclefade1 = anime.timeline({
        loop: false,
        autoplay: false,
    });
    miraclefade1.add({
        targets: '.miraclefade1 .letter',
        translateX: [40, 0], 
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1500,
        delay: (el, i) => 20 * (i + 1)
    });

    var miraclefade2 = anime.timeline({
        loop: false,
        autoplay: false,
    });
    miraclefade2.add({
        targets: '.miraclefade2 .letter', 
        translateX: [40, 0],  
        // translateZ:[40, 0],        
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 3000,
        delay: (el, i) => 20 * (i + 1)
    });    
    miraclefade2.play();

    var miraclefade3 = anime.timeline({
        loop: false,
        autoplay: false,
    });
    miraclefade3.add({
        targets: '.miraclefade3 .letter',  
        translateX: [40, 0],  
        translateZ:[40, 0],    
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 1500,
        delay: (el, i) => 20 * (i + 1)
    });    
  






    const footer = document.querySelector('footer');    
    const anim_elements = document.querySelectorAll('.animated');
 
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                miraclefade3.play();
                miraclefade1.play();
                entry.target.classList.add('animated-active');
                observer.unobserve(entry.target);
            }
        })
    }

    const options = {
        threshold: 0,
    }

    const observer = new IntersectionObserver(callback, options);
    anim_elements.forEach((el) => observer.observe(el));

    function animate_circle_rotate(){
        const animatedCircles = document.querySelectorAll('.animated-circle');
        const scrollPosition = window.scrollY; // Позиция скролла
        const rotation = scrollPosition * 0.05; // Угол поворота
        const translateY = scrollPosition * 0.1; // Смещение вниз
        animatedCircles.forEach(item => {
            item.style.transform = `rotate(${rotation}deg) translateY(${translateY}px)`;            
        })
    }

    function animate_decor_footer() {
        const decor_light = document.querySelector('.footer__decor.--light');
        const decors_dark = document.querySelector('.footer__decor.--dark');
        const banner_decor = document.querySelector('.banner-decor');
        const footer_logo = document.querySelector('.footer__logo');     

        const scrollPosition = window.scrollY; // Позиция скролла
        const viewportHeight = window.innerHeight; // Высота окна просмотра
        const footerOffsetTop = footer.getBoundingClientRect().top; // Позиция подвала относительно окна просмотра
    
        if (footerOffsetTop < viewportHeight && footerOffsetTop > -footer.offsetHeight) { // Проверяем, виден ли подвал
            const maxScrollWithinFooter = footer.offsetHeight + viewportHeight;
            const relativeScroll = Math.min(viewportHeight - footerOffsetTop, maxScrollWithinFooter);
    
            const rotation = relativeScroll * 0.5; // Угол поворота
            const translateY = relativeScroll * 0.4; // Смещение вниз
    
            if (check_width_window(576)) {
                decor_light.style.transform = `translateX(-${relativeScroll * 0.155}px)`;            
                decors_dark.style.transform = `translateX(${relativeScroll * 0.155}px)`;            
                footer_logo.style.transform = `scale(${1 + (relativeScroll / 1000) * 0.4})`; 
               
            } else {
                decor_light.style.transform = `translateY(${translateY}px)`;            
                decors_dark.style.transform = `translateY(${translateY}px)`;            
                footer_logo.style.transform = `translateY(-${relativeScroll * 0.1}px)`;  
                
            }
        }
        banner_decor.style.transition = '0s';
        banner_decor.style.transform = `translateY(${scrollPosition * 0.5}px)`;            
    }    
  
    window.addEventListener('scroll', () => {
        scrollHeaderFixed();
        animate_decor_footer();
        animate_circle_rotate();
    });
 
    /* анимация печати текста с проверкой что тект в поле видимости */     
    const instance = new TypeIt(".typed-out", {
        strings: [
            "Расслабьтесь. Наслаждайтесь. Перезагрузитесь.",
            "Приостановитесь. Отдохните. Возродитесь.",
            "Ваша любимая комната ждет вас!"
        ],
        speed: 100,
    });
    let is_text_active = true;
    document.querySelector('.prompt__decor')?.addEventListener('click', () => {
        is_text_active = !is_text_active;
        document.querySelector(".prompt__text")?.classList.toggle('active');
        if(is_text_active ){
            instance.reset();
        } else {
            instance.go();
        }
    })
    /* анимация печати текста */

    /* анимация вкладышей */ 
    const tab_btn_play = document.querySelector('.gift-tab__play');
    const tab_btn_back = document.querySelector('.gift-tab__btn-back');
    const controls = document.querySelector('.gift-tab__controls');
    const controls_back = document.querySelector('.gift-tab__controls-back');
    const tab_contents = document.querySelectorAll('.gift-tab__content');

    tab_contents.forEach(item_content => {
        item_content.addEventListener('click', () => {
            item_content.classList.add('transform');
            controls.classList.add('hidden');
            controls_back.classList.add('active');
        })
    })
    
    tab_btn_play?.addEventListener('click', () => {
        const tab_active = document.querySelector('.gift-tab__content.active');
        tab_active.classList.add('transform');
        controls.classList.add('hidden');
        controls_back.classList.add('active');
    })
    tab_btn_back?.addEventListener('click', () => {
        const tab_active = document.querySelector('.gift-tab__content.active');
        tab_active.classList.remove('transform');
        controls.classList.remove('hidden');
        controls_back.classList.remove('active');
    })
 
    const flipButton = document.getElementById('flipButton');     
    flipButton.addEventListener('click', () => {
        const tab_active = document.querySelector('.gift-tab__content.active');
        const inlay = tab_active.querySelector('.inlay');
        const img = inlay.querySelector('.inlay__img.--front');
        inlay.classList.toggle('flipped');
    });

    let prxScenes = document.querySelectorAll('.inlay');
    prxScenes?.forEach(scene => {
        let img = scene.querySelector('.inlay__img');

        scene.addEventListener('mousemove', function (e) {
            let x = e.clientX / window.innerWidth;
            let y = e.clientY / window.innerHeight;
            scene.style.transition = 'transform 200ms linear';
            scene.style.transform = `perspective(1000px) rotateY(${y * 20}deg) rotateX(${x * 10}deg) scale3d(1, 1, 1)`;                
        }); 
        scene.addEventListener('mouseout', function (e) {
            scene.style.transform = null;                     
        }); 
        // scene.addEventListener('click', function (e) {
        //     scene.classList.toggle('flipped');                  
        // }); 
    })

    // function wrapText(selector) {
    //     // Находим элемент по заданному селектору
    //     const textElement = document.querySelector(selector);
    //     if (!textElement) return;
    
    //     // Получаем текст из элемента
    //     let innerText = textElement.innerHTML;
    
    //     // Разделяем текст на слова
    //     let words = innerText.split(' ');
    
    //     // Обрабатываем каждое слово
    //     let wrappedWords = words.map(word => {
    //         // Оборачиваем каждую букву в <span class="letter">
    //         let letters = word.split('').map(letter => `<span class="letter">${letter}</span>`).join('');
    
    //         // Возвращаем обёрнутое слово в <span class="tricksword">
    //         return `<span class="tricksword">${letters}&nbsp</span>`;
    //     }).join('');
    
    //     // Оборачиваем все слова в <h3 class="title3 miraclefade3 animated">
    //     let resultHTML = `<h3 class="title3 miraclefade3 animated">${wrappedWords}</h3>`;
    
    //     // Вставляем результат на страницу
    //     textElement.innerHTML = resultHTML;
    // }
    
    // // Применяем функцию к элементу с классом .info-cards__title
    // wrapText('.info-cards__title');

    // document.addEventListener("DOMContentLoaded", function() {
    //     const runningLine = document.querySelector('.running-line');
    //     const textLength = runningLine.offsetWidth; // Получаем ширину текста
    //     const containerWidth = runningLine.parentElement.offsetWidth; // Получаем ширину контейнера
    
    //     // Вычисляем скорость анимации
    //     const duration = (textLength + containerWidth) / 100; // Измените делитель для регулировки скорости
    
    //     runningLine.style.animationDuration = ${duration}s;
    // });
    
    /* /анимация вкладышей */ 
    /* /АНИМАЦИИ */
});

    


// var fadesideuvod = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadesideuvod.add({
//   targets: '.fadesideuvod .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 100 * i
// });

// var fadeside0 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside0.add({
//   targets: '.fadeside0 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 100 * i
// });

// var fadeside1 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside1.add({
//   targets: '.fadeside1 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 70 * i
// });

// var fadeside2 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside2.add({
//   targets: '.fadeside2 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 70 * i
// });

// var fadeside3 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside3.add({
//   targets: '.fadeside3 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 70 * i
// });

// var fadeside4 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside4.add({
//   targets: '.fadeside4 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 70 * i
// });

// var fadeside5 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// fadeside5.add({
//   targets: '.fadeside5 .letter',
//   translateX: [40, 0],
//   translateZ: 0,
//   opacity: [0, 1],
//   easing: "easeOutExpo",
//   duration: 1800,
//   delay: (el, i) => 10 + 70 * i
// });

// var miraclefade0 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// miraclefade0.add({
//   targets: '.miraclefade0 .letter',
//   opacity: [0, 1],
//   easing: "easeInOutQuad",
//   duration: 1500,
//   delay: (el, i) => 20 * (i + 1)
// });

// var miraclefade1 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// miraclefade1.add({
//   targets: '.miraclefade1 .letter',
//   opacity: [0, 1],
//   easing: "easeInOutQuad",
//   duration: 1500,
//   delay: (el, i) => 20 * (i + 1)
// });

// var miraclefade2 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// miraclefade2.add({
//   targets: '.miraclefade2 .letter',
//   opacity: [0, 1],
//   easing: "easeInOutQuad",
//   duration: 1500,
//   delay: (el, i) => 20 * (i + 1)
// });

// var miraclefade3 = anime.timeline({
//   loop: false,
//   autoplay: false,
// });
// miraclefade3.add({
//   targets: '.miraclefade3 .letter',
//   opacity: [0, 1],
//   easing: "easeInOutQuad",
//   duration: 1500,
//   delay: (el, i) => 20 * (i + 1)
// });

// setTimeout(() => {
//   fadesideuvod.play();
// }, 4500);
// setTimeout(() => {
//   fadeside0.play();
// }, 10);
// setTimeout(() => {
//   miraclefade0.play();
// }, 10);

// $('#fadein1').one('inview', function(event, isInView) {
//   if (isInView) {
//     fadeside1.play();
//   } else {}
// });
// $('#fadein2').one('inview', function(event, isInView) {
//   if (isInView) {
//     fadeside2.play();
//   } else {}
// });
// $('#fadein3').one('inview', function(event, isInView) {
//   if (isInView) {
//     fadeside3.play();
//   } else {}
// });
// $('#fadein4').one('inview', function(event, isInView) {
//   if (isInView) {
//     fadeside4.play();
//   } else {}
// });
// $('#fadein5').one('inview', function(event, isInView) {
//   if (isInView) {
//     fadeside5.play();
//   } else {}
// });
// $('#miraclein1').one('inview', function(event, isInView) {
//   if (isInView) {
//     miraclefade1.play();
//   } else {}
// });
// $('#miraclein2').one('inview', function(event, isInView) {
//   if (isInView) {
//     miraclefade2.play();
//   } else {}
// });
// $('#miraclein3').one('inview', function(event, isInView) {
//   if (isInView) {
//     miraclefade3.play();
//   } else {}
// });
