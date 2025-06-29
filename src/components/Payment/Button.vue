<script setup lang="ts">
import type { CollectionEntry } from 'astro:content';
import { ref, Suspense, Ref, onMounted } from 'vue';

import Loader from '@/components/Payment/Loader.vue';

import Reseller from '@/models/Reseller';
import Event from '@/models/Event';

import { PaymentFactory } from '@/utils/payment/PaymentFactory';
import { Payment } from '@/utils/payment/Payment';
import { BtnDecorator } from '@/utils/payment/BtnDecorator';

type Props = {
  event: any;
  style: string;
  reseller?: any;
  type?: 'installment' | 'total';
}

const { event: eventPrimitive, style, reseller: resellerPrimitive, type: forcedType } = defineProps<Props>();
const event: Event = Event.fromPrimitive(eventPrimitive)
const reseller: Reseller | undefined = resellerPrimitive && Reseller.fromPrimitive(resellerPrimitive)

const paymentBtn: Ref<BtnDecorator | undefined> = ref(undefined);
const iconHTML: Ref<string | undefined> = ref(undefined);

const paymentFactory = new PaymentFactory(event, style, reseller);
const payment: Payment = paymentFactory.createPayment();

onMounted(async () => {
  await payment.call()
  await payment.createButton();
  paymentBtn.value = payment.getButton();
  try {
    const icon = await import(`@/assets/${paymentBtn.value.getIcon()}.svg?raw`);
    iconHTML.value = icon.default;
  } catch {
    const icon = await import(`@/assets/icons/${paymentBtn.value.getIcon()}.svg?raw`);
    iconHTML.value = icon.default;
  }
});

</script>

<template>
  <Suspense>
    <template #default>
      <a v-if="paymentBtn && iconHTML" :href="paymentBtn.getUrl()" :class="paymentBtn.getBtnStyle()"
        :title="paymentBtn.getTitleText()" :aria-label="paymentBtn.getTitleText()">
        <i v-html="iconHTML"></i>
        {{ paymentBtn.getButtonText(forcedType) }}
      </a>
      <Loader v-else :type="style" textBtn="Cargando..." textAria="Cargando botón de pago" />
    </template>
    <template #fallback>
      <Loader :type="style" textBtn="Cargando..." textAria="Cargando botón de pago" />
    </template>
  </Suspense>
</template>