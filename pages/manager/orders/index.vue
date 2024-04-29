<template>
  <main>
    <fixedLeftColumn>
      <template v-slot:fixed>
        <Button width="full" color="light-purple-reverse" class="back-btn" style="margin-bottom: 15px">Назад</Button>
        <div class="block" style="padding: 16px; display: flex; flex-direction: column; gap: 15px; margin-bottom: 15px;">
          <InputDate v-model:modelValue="dateValue" :placeholder="'Период'" :range="true" @update:model-value="getOrders()" />
          <Search v-model:searchQuery="searchQuery" v-model:searchType="searchType" :search-types="searchTypes" :select-display-value="'icon'" @submit="getOrders()" />
          <div>
            <Toggle v-for="(toggle, index) in toggles" :key="index" v-model:pressed="toggle.pressed" style="width: fit-content; margin: 5px 0 0 5px ;" :color="'gray'">
              <p :class="`${toggle.icon}`">{{ toggle.text }}</p>
            </Toggle>
          </div>
        </div>
        <div class="block" style="padding: 16px; display: flex; flex-direction: column; gap: 15px; ">
          <Select v-model:modelValue="selectValue" :items="items" :label="'Год'" />
          <div style="display: flex; justify-content: space-between; gap: 15px;">
            <Button width="full" @click="getOrders()">Показать</Button>
            <Button width="full" color="light-purple-reverse" @click="clearYear()">Отмена</Button>
          </div>
        </div>
      </template>
      <Empty v-if="!orders" style="margin-top: 25%;">Ничего не найдено</Empty>
      <StatusCard v-for="order in orders" v-else :key="order.id" style="padding: 15px; margin-bottom: 15px;" status="success">
        №: {{ order.id }}
      </StatusCard>
    </fixedLeftColumn>
  </main>
</template>
<script setup lang="ts">
import fixedLeftColumn from '~/shared/ui/templates/fixed-left-column.vue';
import { InputDate } from '~/shared/ui/inputs/input-date';
import { Search } from '~/shared/ui/search';
import { Toggle } from '~/shared/ui/toggle';
import { Select } from '~/shared/ui/select';
import { Button } from '~/shared/ui/button';
import { StatusCard } from '~/shared/ui/status-card';
import { Empty } from '~/shared/ui/empty';

import { getData, type SearchParameters } from '~/shared/api/internal/testApi';

const convertDate = (date?: Date[]): string[] => {
  return date?.map((item) => item.toLocaleDateString().split('.').reverse().join('')) || ['', ''];
}

type Icons = "fa-ruble-sign" | "fa-cloud-upload-alt" | "fa-regular fa-crown" | "fa-regular fa-truck" | "fa-regular fa-thumbs-up" | "fa-regular fa-thumbs-down" | "fa-regular fa-briefcase" | "fa-solid fa-money-bill-1"

interface Toggles {
  pressed: boolean;
  icon?: Icons,
  text?: string
}
const toggles = ref<Toggles[]>([
  {
    pressed: false,
    text: "Все"
  },
  {
    pressed: false,
    icon: "fa-regular fa-crown"
  },
  {
    pressed: false,
    icon: "fa-regular fa-thumbs-down"
  },
  {
    pressed: false,
    icon: "fa-regular fa-thumbs-up"
  },
  {
    pressed: false,
    icon: "fa-regular fa-briefcase"
  },
  {
    pressed: false,
    icon: "fa-cloud-upload-alt"
  },
  {
    pressed: false,
    icon: "fa-regular fa-truck"
  },
  {
    pressed: true,
    icon: "fa-solid fa-money-bill-1"
  },
  {
    pressed: false,
    icon: "fa-ruble-sign"
  }
]
)

const items = [{ value: '2021' }, { value: '2022' }, { value: '2023' },]

const orders = ref()
const dateValue = ref()
const selectValue = ref('')
const searchQuery = ref('')
const searchType = ref('psid')
const searchTypes =
{
  'order_number': {
    placeholder: 'Введите номер заказа',
    title: 'Номер заказа'
  },
  'psid': {
    placeholder: 'Введите номер фотосессии',
    title: 'Номер фотосессии'
  },
  'client_id': {
    placeholder: 'Введите клиент ID',
    title: 'Клиент ID'
  },
  'phone': {
    placeholder: 'Введите телефон',
    title: 'Телефон'
  },
  'email': {
    placeholder: 'Введите email',
    title: 'Email'
  },
  'payer': {
    placeholder: 'Плательщик, ребенок',
    title: 'Плательщик, ребенок'
  },
}

const getOrders = async () => {
  const query: SearchParameters = {
    search_type: searchType.value,
    search_value: searchQuery.value,
    date_start: convertDate(dateValue.value)[0],
    date_finish: convertDate(dateValue.value)[1],
    year: selectValue.value
  }
  const resp: any = await getData(query);
  orders.value = resp.response.data.orders
}

const clearYear = () => {
  selectValue.value = '';
  getOrders()
}

onMounted(async () => {
  await getOrders()
})

</script>
<style lang="scss" scoped>
.back-btn {
  @include start-at("lg") {
    display: none;
  }
}
</style>