<!--
 * @Description: 
 * @Author: 笙痞77
 * @Date: 2023-07-13 17:35:55
 * @LastEditors: 笙痞77
 * @LastEditTime: 2023-07-14 14:52:48
-->
<template>
  <div class="go-login-box">
    <layout-header>
      <template #left></template>
      <template #right>
        <go-lang-select></go-lang-select>
        <go-theme-select></go-theme-select>
      </template>
    </layout-header>
    <div class="go-login">
      <div class="go-login-carousel">
        <n-carousel autoplay dot-type="line" :interval="Number(carouselInterval)">
          <img v-for="(item, i) in carouselImgList" :key="i" class="go-login-carousel-img"
            :src="getImageUrl(item, 'login')" alt="image" />
        </n-carousel>
      </div>
      <div class="login-account">
        <div class="login-account-container">
          <n-collapse-transition :appear="true" :show="show">
            <n-card class="login-account-card" :title="$t('register.register_desc')">
              <n-form ref="formRef" label-placement="left" size="large" :model="formInline" :rules="rules">
                <n-form-item path="username">
                  <n-input v-model:value="formInline.username" type="text" maxlength="16"
                    :placeholder="$t('global.form_account')">
                    <template #prefix>
                      <n-icon size="18">
                        <PersonOutlineIcon></PersonOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item path="password">
                  <n-input v-model:value="formInline.password" type="password" maxlength="16" show-password-on="click"
                    :placeholder="$t('global.form_password')">
                    <template #prefix>
                      <n-icon size="18">
                        <LockClosedOutlineIcon></LockClosedOutlineIcon>
                      </n-icon>
                    </template>
                  </n-input>
                </n-form-item>
                <n-form-item>
                  <n-button type="primary" @click="handleSubmit" size="large" :loading="loading" block>{{
                    $t('register.register_form_button')
                  }}</n-button>
                </n-form-item>
              </n-form>
            </n-card>
          </n-collapse-transition>
        </div>
      </div>
    </div>
    <div class="go-login-box-footer">
      <layout-footer></layout-footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { GoThemeSelect } from '@/components/GoThemeSelect'
import { GoLangSelect } from '@/components/GoLangSelect'
import { LayoutHeader } from '@/layout/components/LayoutHeader'
import { LayoutFooter } from '@/layout/components/LayoutFooter'
import { carouselInterval } from '@/settings/designSetting'
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import shuffle from 'lodash/shuffle'
import { registerApi } from '@/api/path'
import { routerTurnByName } from '@/utils'
import { PageEnum } from '@/enums/pageEnum'


import { icon } from '@/plugins'


const { PersonOutlineIcon, LockClosedOutlineIcon } = icon.ionicons5
interface FormState {
  username: string
  password: string
}
const t = window['$t']
const formInline = reactive({
  username: '',
  password: ''
})

// 轮播图
const carouselImgList = ['one', 'two', 'three']

const showBg = ref(false)
const loading = ref(false)
const autoLogin = ref(true)
const show = ref(false)
const formRef = ref()
const rules = {
  username: {
    required: true,
    message: t('global.form_account'),
    trigger: 'blur'
  },
  password: {
    required: true,
    message: t('global.form_password'),
    trigger: 'blur'
  }
}
// 背景图
const bgList = ref(['bar_y', 'bar_x', 'line_gradient', 'line', 'funnel', 'heatmap', 'map', 'pie', 'radar'])
// 定时器
const shuffleTimiing = ref()
// 打乱图片顺序
const shuffleHandle = () => {
  shuffleTimiing.value = setInterval(() => {
    bgList.value = shuffle(bgList.value)
  }, carouselInterval)
}
onMounted(() => {
  setTimeout(() => {
    show.value = true
  }, 300)

  setTimeout(() => {
    showBg.value = true
  }, 100)

  shuffleHandle()
})
onUnmounted(() => {
  clearInterval(shuffleTimiing.value)
})
const handleSubmit = (e: Event) => {
  e.preventDefault()
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline
      loading.value = true
      // 提交请求
      const res = await registerApi({
        username,
        password
      })

      if (res && res.data) {
        window['$message'].success(t('register.register_success'))
        routerTurnByName(PageEnum.BASE_LOGIN_NAME)
      } else {
        window['$message'].error(t(res?.message))
      }
      loading.value = false
    } else {
      window['$message'].error(t('register.register_message'))
    }
  })
}
// 处理url获取
const getImageUrl = (name: string, folder: string) => {
  return new URL(`../../assets/images/${folder}/${name}.png`, import.meta.url).href
}
</script>
<style lang="scss" scoped>
$width: 450px;
$go-login-height: 100vh;
$account-img-height: 210px;
$footer-height: 50px;
$carousel-width: 30%;
$carousel-image-height: 60vh;

* {
  box-sizing: border-box;
}

@include go(login-box) {
  height: $go-login-height;
  overflow: hidden;
  @include background-image('background-image');

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    height: $--header-height;
  }

  &-divider {
    margin: 0;
    padding-top: 0;
  }

  @include go(login) {
    z-index: 2;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: -$--header-height;
    height: $go-login-height;
    width: 100vw;

    &-carousel {
      width: $carousel-width;
      margin-top: 100px;
      min-width: 500px;

      &-img {
        display: block;
        margin: 0 auto;
        height: $carousel-image-height;
      }
    }

    .login-account {
      display: flex;
      flex-direction: column;
      margin: 0 160px;

      &-container {
        width: $width;
      }

      &-card {
        @extend .go-background-filter;
        @include fetch-bg-color('filter-color');
        box-shadow: 0 0 20px 5px rgba(40, 40, 40, 0.3);
      }

      &-top {
        padding-top: 10px;
        text-align: center;
        height: $account-img-height;
        margin-bottom: 20px;
      }
    }
  }

  &-footer {
    z-index: 2;
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  &-bg {
    z-index: 0;
    position: fixed;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background: url('@/assets/images/login/login-bg.png') no-repeat 0 -120px;

    .bg-slot {
      width: $carousel-width;
    }

    .bg-img-box {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      width: 770px;
      margin-right: -20px;

      &-li {
        img {
          margin-right: 20px;
          margin-top: 20px;
          width: 230px;
          border-radius: 2 * $--border-radius-base;
          opacity: 0.9;
        }
      }
    }
  }
}

@media only screen and (max-width: 1200px) {

  .bg-img-box,
  .bg-slot,
  .go-login-carousel {
    display: none !important;
  }

  .go-login-box-footer {
    position: relative;
  }
}
</style>