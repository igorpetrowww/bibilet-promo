const GOOGLE_SHEET_SCRIPT = 'https://script.google.com/macros/s/AKfycbz0LmL99WRGCQsUCHYbU94s7f1yohGVtj4U21KVKzK2CAUJhgw7ud7DlDJ3MOeEvAfs/exec'

const STORAGE_KEY = 'bibilet_form_data'

const showError = () => {
  alert('Что-то сломалось. Попробуйте ещё раз или напишите нам на почту: privet@bibilet.ru')
}

const saveFormData = () => {
  const $inputs = document.querySelectorAll('input, textarea')
  const formData = {}
  
  $inputs.forEach($input => {
    if ($input.name || $input.id) {
      const key = $input.name || $input.id
      formData[key] = $input.value
    }
  })
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
}

const restoreFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY)
  if (!savedData) return
  
  try {
    const formData = JSON.parse(savedData)
    const $inputs = document.querySelectorAll('input, textarea')
    
    $inputs.forEach($input => {
      const key = $input.name || $input.id
      if (key && formData[key]) {
        $input.value = formData[key]
      }
    })
  } catch (err) {
    console.warn(err)
  }
}

const setLoading = ($form, isLoading) => {
  $form.classList.toggle('is__loading', isLoading)
  $form.querySelectorAll('button, input').forEach($el => $el.disabled = isLoading)
}

export const initForm = () => {
  const $form = document.querySelector('.js-form')
  
  restoreFormData()
  
  const $inputs = document.querySelectorAll('input, textarea')
  $inputs.forEach($input => {
    $input.addEventListener('input', saveFormData)
    $input.addEventListener('change', saveFormData)
  })
  
  $form.addEventListener('submit', (e) => {
    e.preventDefault()

    const body = new FormData($form)
    setLoading($form, true)

    setTimeout(() => {
      setLoading($form, false)
      $form.classList.add('is__success')
    }, Math.floor(Math.random() * (500 - 350 + 1)) + 350)

    fetch(GOOGLE_SHEET_SCRIPT, { method: 'POST', body})
    .then(res => {
      if (!res.ok) {
        showError()
        return
      }
    })
    .catch(showError)
  })
}