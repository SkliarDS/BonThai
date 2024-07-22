 /* Валидация */ 
const validation_forms = document.querySelectorAll('[data-form-validation]');
validation_forms.forEach(form => {
    const form_button = form.querySelector('.send-button');
    const form_checkbox = form.querySelector('[type="checkbox"]');        
    const form_phone = form.querySelector('[data-form-phone]');        
    const form_mail = form.querySelector('[data-form-mail]');        
    const form_input = form.querySelector('[data-form-text]');

    function validatePhoneNumber(phoneNumber) {
        const phoneDigits = phoneNumber.replace(/\D/g, ''); 
        return phoneDigits.length === 11;
    };
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    form_input ? form_input.addEventListener('blur', () => {
        if(form_input.value.trim() == ''){
            form_input.classList.add('is-not-valid');  
            form_input.nextElementSibling.innerHTML = 'Введите ваше имя';                  
        } else {
            form_input.classList.remove('is-not-valid');
            form_input.nextElementSibling.innerHTML = '';
        }
        validation();
    }) : null;
    form_input ? form_input.addEventListener('input', () => {
        if(form_input.value.trim() !== ''){
            form_input.classList.remove('is-not-valid');   
            form_input.nextElementSibling.innerHTML = '';                 
        } else {
            form_input.classList.add('is-not-valid');
            form_input.nextElementSibling.innerHTML = 'Введите ваше имя';
        }
        validation();
    }) : null;

    form_phone ? form_phone.addEventListener('blur', () => {
        if(!validatePhoneNumber(form_phone.value.trim())){
            form_phone.classList.add('is-not-valid');    
            form_phone.nextElementSibling.innerHTML = 'Телефон введен не полностью';                
        } else {
            form_phone.classList.remove('is-not-valid');
            form_phone.nextElementSibling.innerHTML = '';
        }
        validation();
    }) : null;
    form_phone ? form_phone.addEventListener('input', () => {
        if(validatePhoneNumber(form_phone.value.trim())){
            form_phone.classList.remove('is-not-valid');  
            form_phone.nextElementSibling.innerHTML = '';                  
        } else {
            form_phone.classList.add('is-not-valid');
            form_phone.nextElementSibling.innerHTML = 'Телефон введен не полностью';  
        }
        validation();
    }) : null;  
            
    form_mail ? form_mail.addEventListener('blur', () => {
        if(!emailPattern.test(form_mail.value)){
            form_mail.classList.add('is-not-valid');  
            form_mail.nextElementSibling.innerHTML = 'Email введен не верно';                    
        } else {
            form_mail.classList.remove('is-not-valid');
            form_mail.nextElementSibling.innerHTML = '';  
        }
        validation();
    }) : null;
    form_mail ? form_mail.addEventListener('input', () => {
        if(emailPattern.test(form_mail.value)){
            form_mail.classList.remove('is-not-valid'); 
            form_mail.nextElementSibling.innerHTML = ''; 
        } else {
            form_mail.nextElementSibling.innerHTML = 'Email введен не верно';                               
            form_mail.classList.add('is-not-valid');
        }
        validation();
    }) : null;           

    function validation(){
        let valid = true;
        const checkbox_checked = form_checkbox.checked;
        
        if(form_input && form_input.value.trim() == ''){
            valid = false;
        };
        if(form_phone && !validatePhoneNumber(form_phone.value.trim())){
            valid = false;
        };       
        if(form_mail && !emailPattern.test(form_mail.value)){
            valid = false;
        };       
        
        if(valid && checkbox_checked){
            form_button.disabled = false;
        } else {
            form_button.disabled = true;
        };
    }
    form_checkbox ? form_checkbox.addEventListener('change', validation) : null;

});
 
 
 