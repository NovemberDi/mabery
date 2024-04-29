<template>
  <div>
    <Empty v-if="!order" style="margin-top: 25%;">Ничего не найдено</Empty>
    <StatusCard v-else style="padding: 15px; margin: 15px;" status="success">
      №: {{ order[0].id }}
    </StatusCard>
  </div>
</template>
<script setup lang="ts">
import { StatusCard } from '~/shared/ui/status-card';
import { Empty } from '~/shared/ui/empty';

import { getData, type SearchParameters } from '~/shared/api/internal/testApi';

const route = useRoute()

const order = ref()
const getOrder = async () => {
  const id = (route.params as any).id
  const query: SearchParameters = {
    search_type: 'order_number',
    search_value: id
  }
  const resp: any = await getData(query);
  order.value = resp.response.data.orders
}
onMounted(async () => {
  await getOrder()
})
</script>