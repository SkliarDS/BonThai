/* Валидация */ 
const validation_forms = document.querySelectorAll('[data-form-validation]');
validation_forms.forEach(form => {
    const form_button = form.querySelector('[data-send-button]');
    const form_checkbox = form.querySelector('.--check-valid');        
    const form_phone = form.querySelector('[data-form-phone]');        
    const form_mail = form.querySelector('[data-form-mail]');        
    const form_input = form.querySelector('[data-form-text]');
    const form_password = form.querySelector('[data-form-password]');
    const form_pass_icons = form.querySelectorAll('.form-modal__icon-password');
    let is_password = true;

    let show = true;
    form_pass_icons.forEach(form_pass_icon => {
        form_pass_icon.addEventListener('click', (e) => {
            show = !show;
            const label = form_pass_icon.closest('.form-modal__field');
            const pass = label.querySelector('[data-form-password]');
            const img = form_pass_icon.querySelector('img');
    
            img.src = show ? './../img/icons/show_pass.svg' : './../img/icons/hide_pass.svg';
            pass.type = show ?  'password' : 'text';
        });
    })

    function check_error(el, isError, errorText = 'Обязательное поле'){
        const form_block = el.closest('[data-form-block]');
        const text_error = form_block.querySelector('[data-form-error]');
        if(isError){
            form_block.classList.add('active');
            text_error.innerHTML = errorText;
        } else {
            form_block.classList.remove('active');
            text_error.innerHTML = '';
        }
    }

    function validatePhoneNumber(phoneNumber) {
        // const phoneDigits = phoneNumber.replace(/\D/g, ''); 
        // return phoneDigits.length === 11;
        console.log('phoneNumber:',phoneNumber.length);
        return phoneNumber.length >= 6;
    };

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    form_password ? form_password.addEventListener('blur', () => {
        if(form_password.value.trim() == ''){             
            check_error(form_password, true);    
        } else {
            check_error(form_password, false);
        }
        validation();
    }) : null;
    form_password ? form_password.addEventListener('input', () => {
        if(form_password.value.trim() !== ''){
            check_error(form_password, false); 
        } else {
            check_error(form_password, true);                 
        }
        validation();
    }) : null;

    form_input ? form_input.addEventListener('blur', () => {
        if(form_input.value.trim() == ''){             
            check_error(form_input, true);    
        } else {
            check_error(form_input, false);
        }
        validation();
    }) : null;
    form_input ? form_input.addEventListener('input', () => {
        if(form_input.value.trim() !== ''){
            check_error(form_input, false); 
        } else {
            check_error(form_input, true);                 
        }
        validation();
    }) : null;

    form_phone ? form_phone.addEventListener('blur', () => {
        if(!validatePhoneNumber(form_phone.value.trim())){
            check_error(form_phone, true); 
        } else {
            check_error(form_phone, false);
        }
        validation();
    }) : null;
    form_phone ? form_phone.addEventListener('input', () => {
        if(validatePhoneNumber(form_phone.value.trim())){
            check_error(form_phone, false);                
        } else {
            check_error(form_phone, true);
        }
        validation();
    }) : null;  
            
    form_mail ? form_mail.addEventListener('blur', () => {
        if(!emailPattern.test(form_mail.value)){        
            check_error(form_mail, true);           
        } else {
            check_error(form_mail, false); 
        }
        validation();
    }) : null;
    form_mail ? form_mail.addEventListener('input', () => {
        if(emailPattern.test(form_mail.value)){
            check_error(form_mail, false);                            
        } else { 
            check_error(form_mail, true);
        }
        validation();
    }) : null;           

    function validation(){
        let valid = true;
        let checkbox_checked ;
        if(form_checkbox){
            checkbox_checked = form_checkbox.checked;
        } else {
            checkbox_checked = true;
        }
        
        if(form_input && form_input.value.trim() == ''){
            valid = false;
        };
        if(form_phone && !validatePhoneNumber(form_phone.value.trim())){
            valid = false;
        };       
        if(form_mail && !emailPattern.test(form_mail.value)){
            valid = false;
        };       
        if(form_password && !is_password){
            valid = false;
        };       
        
        if(valid && checkbox_checked){
            form_button.disabled = false;
        } else {
            form_button.disabled = true;
        };
    }
    form_checkbox ? form_checkbox.addEventListener('change', () => {
        validation();
        if(form_checkbox.checked == true){
            check_error(form_checkbox, false);
        } else {
            check_error(form_checkbox, true);
        }
    }) : null;

});
  
  
  