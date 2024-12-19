(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('userForm');
        const page1 = document.getElementById('page1');
        const page2 = document.getElementById('page2');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const formResult = document.getElementById('formResult');
        const medicalConditionDetailsGroup = document.getElementById('medicalConditionDetailsGroup');
        const disabilityDetailsGroup = document.getElementById('disabilityDetailsGroup');

        if (!form || !page1 || !page2 || !nextBtn || !prevBtn || !formResult || !medicalConditionDetailsGroup || !disabilityDetailsGroup) {
            console.error('One or more required elements are missing');
            return;
        }

        nextBtn.addEventListener('click', function() {
            if (validatePage1()) {
                page1.style.display = 'none';
                page2.style.display = 'block';
            }
        });

        prevBtn.addEventListener('click', function() {
            page2.style.display = 'none';
            page1.style.display = 'block';
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validatePage2()) {
                displayFormData();
            }
        });

        const medicalConditionInputs = document.querySelectorAll('input[name="medicalCondition"]');
        medicalConditionInputs.forEach(input => {
            input.addEventListener('change', function() {
                medicalConditionDetailsGroup.style.display = this.value === 'yes' ? 'block' : 'none';
                if (this.value === 'no') {
                    document.getElementById('medicalConditionDetails').value = '';
                    clearError(document.getElementById('medicalConditionDetails'));
                }
            });
        });

        const disabilityInputs = document.querySelectorAll('input[name="disability"]');
        disabilityInputs.forEach(input => {
            input.addEventListener('change', function() {
                disabilityDetailsGroup.style.display = this.value === 'yes' ? 'block' : 'none';
                if (this.value === 'no') {
                    document.getElementById('disabilityDetails').value = '';
                    clearError(document.getElementById('disabilityDetails'));
                }
            });
        });

        function validatePage1() {
            let isValid = true;

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const country = document.getElementById('country');
            const gender = document.querySelector('input[name="gender"]:checked');

            if (!validateField(name, 'Name is required')) isValid = false;
            if (!validateField(email, 'Email is required') || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            if (!validateField(country, 'Please select a country')) isValid = false;
            if (!gender) {
                showError(document.getElementById('genderError'), 'Please select a gender');
                isValid = false;
            } else {
                clearError(document.getElementById('genderError'));
            }

            return isValid;
        }

        function validatePage2() {
            let isValid = true;

            const medicalCondition = document.querySelector('input[name="medicalCondition"]:checked');
            const medicalConditionDetails = document.getElementById('medicalConditionDetails');
            const disability = document.querySelector('input[name="disability"]:checked');
            const disabilityDetails = document.getElementById('disabilityDetails');

            if (!medicalCondition) {
                showError(document.getElementById('medicalConditionError'), 'Please select an option');
                isValid = false;
            } else {
                clearError(document.getElementById('medicalConditionError'));
                if (medicalCondition.value === 'yes' && !validateField(medicalConditionDetails, 'Please provide details about your medical condition')) {
                    isValid = false;
                }
            }

            if (!disability) {
                showError(document.getElementById('disabilityError'), 'Please select an option');
                isValid = false;
            } else {
                clearError(document.getElementById('disabilityError'));
                if (disability.value === 'yes' && !validateField(disabilityDetails, 'Please provide details about your disability')) {
                    isValid = false;
                }
            }

            return isValid;
        }

        function validateField(field, errorMessage) {
            if (field.value.trim() === '') {
                showError(field, errorMessage);
                return false;
            } else {
                clearError(field);
                return true;
            }
        }

        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function showError(input, message) {
            let errorElement = input.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error')) {
                errorElement = document.createElement('span');
                errorElement.classList.add('error');
                input.parentNode.insertBefore(errorElement, input.nextSibling);
            }
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.classList.add('error-input');
        }

        function clearError(input) {
            const errorElement = input.nextElementSibling;
            if (errorElement && errorElement.classList.contains('error')) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
            input.classList.remove('error-input');
        }

        function displayFormData() {
            const formData = new FormData(form);
            let result = '<div class="submitted-data">';
            result += '<h3>Submitted Information</h3>';
            for (let [key, value] of formData.entries()) {
                if ((key === 'medicalConditionDetails' && formData.get('medicalCondition') === 'no') ||
                    (key === 'disabilityDetails' && formData.get('disability') === 'no')) {
                    continue;
                }
                result += `<div class="data-item"><span class="data-label">${formatLabel(key)}:</span><span class="data-value">${capitalizeFirstLetter(value)}</span></div>`;
            }
            result += '</div>';
            formResult.innerHTML = result;
            form.reset();
            page2.style.display = 'none';
            page1.style.display = 'block';
            medicalConditionDetailsGroup.style.display = 'none';
            disabilityDetailsGroup.style.display = 'none';
            formResult.scrollIntoView({ behavior: 'smooth' });
        }

        function formatLabel(key) {
            return capitalizeFirstLetter(key.split(/(?=[A-Z])/).join(' '));
        }

        function capitalizeFirstLetter(string) {
            return string.replace(/\b\w/g, l => l.toUpperCase());
        }

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            if ('ontouchstart' in window) {
                card.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                });
                card.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            }
            card.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
            });
            card.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        const userNameElement = document.getElementById('userName');
        if (userNameElement) {
            userNameElement.textContent = 'Jane Smith';
        } else {
            console.error('User name element not found');
        }

        ['newBtn', 'uploadBtn', 'shareBtn'].forEach(btnId => {
            document.getElementById(btnId).addEventListener('click', function() {
                alert(`${this.textContent} functionality to be implemented`);
            });
        });

        const navItems = document.querySelectorAll('.sidebar a');
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                navItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
            });
        });
    });
})();

