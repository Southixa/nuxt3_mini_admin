<template>
    <div class="bg-gray-200 max-w-screen-xl mx-auto mt-[80px] shadow-lg border border-slate-100 rounded-[4px]">
        <div class="w-full bg-white flex">
            <div class="w-[45%] h-[400px] bg-white flex justify-center items-center pt-20">
                <div class="w-[500px]">
                    <n-upload
                        directory-dnd
                        :max="1"
                        list-type="image"
                        :default-upload="false"
                        @change="handleClick"
                    >
                        <n-upload-dragger class="h-[350px] flex flex-col justify-center items-center">
                            <div style="margin-bottom: 12px">
                                <n-icon size="48" :depth="3">
                                <archive-icon />
                                </n-icon>
                            </div>
                            <n-text style="font-size: 16px">
                                ຄຶກ ຫຼື ລາກຟາຍຮູບພາບ
                            </n-text>
                            <n-p depth="3" style="margin: 8px 0 0 0">
                                ຮອງຮັບການອັບໂຫລດຟາຍຮູບ png, jpg
                            </n-p>
                        </n-upload-dragger>
                    </n-upload>
                </div>
            </div>
            <div class="w-[55%] bg-white p-8">
                <n-form-item label="ຊື່">
                    <n-input @keydown.enter.prevent placeholder="ປ້ອນຊື່..." v-model:value="frm.name"/>
                </n-form-item>
                <n-form-item label="ລາຄາຊື້">
                    <n-input @keydown.enter.prevent placeholder="ປ້ອນລາຄາຊື້..." v-model:value="frm.buyPrice"/>
                </n-form-item>
                <n-form-item label="ລາຄາຂາຍ">
                    <n-input @keydown.enter.prevent placeholder="ປ້ອນລາຄາຂາຍ..." v-model:value="frm.sellPrice"/>
                </n-form-item>
                <n-form-item label="ລາຍລະອຽດ">
                    <n-input
                        v-model:value="frm.detail"
                        placeholder="ປ້ອນລາຍລະອຽດສິນຄ້າ..."
                        type="textarea"
                        :autosize="{
                        minRows: 3,
                        maxRows: 5
                        }"
                    />
                </n-form-item>
                <div class="w-full bg-white flex justify-center gap-5 mt-8 mb-2">
                    <n-button class="w-24">ຍົກເລີກ</n-button>
                    <n-button type="primary" class="w-24" @click="handleAdd">
                        ເພີ່ມ
                    </n-button>
                </div>
            </div>
        </div>
    </div>
    <div>
        {{ frm  }}
        <input type="file" @change="handleInput">
    </div>
    <div>
        {{ fileImage  }}
    </div>
</template>

<script setup>
import { useMessage } from 'naive-ui'
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";
const { clients, getToken, onLogin, onLogout } = useApollo()
const { client } = useApolloClient();
const message = useMessage()

const frm = ref({
    name: '',
    buyPrice: 0,
    sellPrice: 0,
    detail: ''
})

const fileImage = ref(null);



// const query = gql`
//     query products($limit: Int){
//         products(
//             limit: $limit
//         ){
//             pro_id
//             name
//         }
//     }
// `

// const variables = { limit: 100 }

// async function handleAdd () {
//     const { data, errors } = await client.query({ query: query, variables });
//     console.log({data, errors});
// }

const INSERT = gql`
   mutation insertProducts($object: products_insert_input!) {
    products: insert_products_one(object: $object) {
        name
        buy_price
        sell_price
        detail
    }
   }
`

async function handleAdd () {
    const token = useCookie('token');

    if(fileImage.value) {
        const formData = new FormData();
        console.log(fileImage.value);
        formData.append("file", fileImage.value);
        console.log(formData);
        const respon = await $fetch('https://rlthcrbelmcmplfoglcj.storage.ap-southeast-1.nhost.run/v1/files', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token.value}`,
            },
            body: formData
        }).then((res) => {
            console.log("succeess upload image");
        }).catch((res) => {
            console.log("Error upload image");
            console.log(res);
        })
    }

    const { data, errors } = await client.mutate({
        mutation: INSERT,
        variables: {
            object: {
                name: frm.value.name,
                buy_price: frm.value.buyPrice,
                sell_price: frm.value.sellPrice,
                detail: frm.value.detail
            }
        }
    });
    if(!errors) {
        message.success("Product has been added")
    }
    console.log({data, errors});
}

function handleClick (data) {
    const file = data.file.file;
    fileImage.value = file;
}

function handleInput (data) {
    const file = data.target.files[0];
    fileImage.value = file;
    console.log(data.target.files[0]);
    var reader = new FileReader();
	reader.onload = function(e) {
		// binary data
		console.log(e.target.result);
        console.log('use onload in reader');
	};
    reader.readAsBinaryString(file);
}

</script>
