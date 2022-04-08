# `tilda-interkassa-worker 💵💷💴 — WIP`

<details>
  <summary>Принцип работы</summary>

- - -

Что касается API взаимодействия, то необходимо разместить форму оплаты на сайте, по которой будет проходить оплата — детальней о ней в документации тут: https://docs.interkassa.com/#section/3.-Protocol/3.2.-Payment-request-form

В запросах можно создавать цифровую подпись, как это зделать, детально тут:
https://docs.interkassa.com/#section/3.-Protocol/3.5.-Generate-the-digital-signature

После проведения платежа, мы отправим на ваш сервер коллбэк с данными проведенной операции, детальней об этом здесь: https://docs.interkassa.com/#section/3.-Protocol/3.4.-Payment-notification

- - -

</details>

<details>
  <summary>Код для тильды</summary>

- - -

Необходимо поправить:
- [ ] CSS-спиннер на что-то более современное
- [ ] Дописать в JS интеграцию с воркером

- - -

  <details>
    <summary>CSS</summary>

  ```CSS
  a[href*='#buy-course'].loading {
    color: transparent !important;
  }

  .loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 3em;
    height: 3em;
    margin: auto;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-animation: load3 1.4s infinite linear;
    animation: load3 1.4s infinite linear;
    text-indent: -9999em;
    border-radius: 50%;
    background: #1454f2;
    background: -moz-linear-gradient(left, #fff 10%, rgba(255, 255, 255, 0) 42%);
    background: -webkit-linear-gradient(left, #fff 10%, rgba(255, 255, 255, 0) 42%);
    background: -o-linear-gradient(left, #fff 10%, rgba(255, 255, 255, 0) 42%);
    background: -ms-linear-gradient(left, #fff 10%, rgba(255, 255, 255, 0) 42%);
    background: linear-gradient(to right, #fff 10%, rgba(255, 255, 255, 0) 42%);
  }

  .loader:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 50%;
    content: '';
    border-radius: 100% 0 0 0;
    background: #fff;
  }

  .loader:after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 75%;
    height: 75%;
    margin: auto;
    content: '';
    border-radius: 50%;
    background: #1454f2;
  }

  @-webkit-keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes load3 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }

    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  ```
  </details>

  <details>
    <summary>JS</summary>

  ```JS
  window.addEventListener('load', function () {
    var triggers = document.querySelectorAll("a[href='#buy-course']");

    for (var index = 0; index < triggers.length; index++) {
      triggers[index].addEventListener('click', function (event) {
        event.preventDefault();

        var loader = document.createElement('div');
        loader.classList.add('loader');
        loader.textContent = 'Loading...';

        event.target.appendChild(loader);
        event.target.classList.add('loading');

        document.querySelector('form[name="payment"]').submit();
      });
    }
  });
  ```
  </details>

  <details>
    <summary>HTML</summary>

  ```HTML
  <form
    name="payment"
    method="post"
    action="https://sci.interkassa.com/"
    accept-charset="UTF-8"
    style="display: none"
  >
    <input type="hidden" name="ik_co_id" value="" />
    <input type="hidden" name="ik_pm_no" value="" />
    <input type="hidden" name="ik_cur" value="" />
    <input type="hidden" name="ik_am" value="" />
    <input type="hidden" name="ik_desc" value="" />
    <input type="hidden" name="ik_sign" value="" />
    <input type="submit" value="Pay" />
  </form>
  ```
  </details>
</details>
