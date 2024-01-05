<template>
    <div class="bg-white w-[600px] mx-auto mt-[80px] p-4 shadow-md rounded-sm border border-gray-100">
        <n-form-item path="age" label="Email">
            <n-input placeholder="Email..." v-model:value="frm.email"></n-input>
        </n-form-item>
        <n-form-item path="age" label="password">
            <n-input placeholder="Password..." v-model:value="frm.password"></n-input>
        </n-form-item>
        <div class="mt-8 flex justify-center gap-4">
            <n-button type="primary" @click="login">Login</n-button>
        </div>
    </div>
</template>

<script setup>
import { useMessage } from 'naive-ui'
const cookie = useCookie('token')
const message = useMessage()

const frm = ref({
    email: '',
    password: ''
})

async function login () {
    const respon = await $fetch('https://rlthcrbelmcmplfoglcj.auth.ap-southeast-1.nhost.run/v1/signin/email-password', {
        method: 'POST',
        body: frm.value
    }).then((res) => {
        message.success(
          "Login Succeeded"
        )
        cookie.value = res.session.accessToken;
        //localStorage.setItem("token", res.session.accessToken)
        navigateTo("/product/add");
    }).catch((res) => {
        message.error('Invalid Email and Password')
    })
}

</script>