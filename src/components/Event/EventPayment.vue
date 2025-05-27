<script lang="ts" setup>
import { ref, onMounted, Ref } from 'vue';

import type { IPagueloFacilOptions } from '@/utils/LinkGenerators/PagueloFacil';
import { BtnDecorator } from '@/utils/BtnDecorator.ts';
import { IPagueloFacilLinkGenerator, PagueloFacilLinkGenerator } from '@/utils/LinkGenerators/PagueloFacil';
import { Event } from '@/models/Event';
import { WhatsappLinkGenerator } from '@/utils/LinkGenerators/Whatsapp';
import { LinkGenerator } from '@/utils/LinkGenerator';
import { CollectionEntry } from 'astro:content';
import HexEncoder from '@/utils/HexEncoder';
import UnicodeNormalizer from '@/utils/UnicodeNormalizer';

const paymentBtn = ref(null) as Ref<BtnDecorator | null>;

const { event: eventEntry } = defineProps<{ event: CollectionEntry<'events'> }>();
const event: Event = Event.fromCollectionEntry(eventEntry) as Event;


onMounted(async () => {
  const pagueloFacilOptions: IPagueloFacilOptions = {
    cclw: 'E7D8F1DF90910945B0AEA09FE6FD80E906939C2C3A5427DE6D7ACADD01D8444786F354BA8AE94672DA0D4918526D3014AC561044B9116784BE2235B092451F8A',
    eventId: event.getId() as string,
    returnUrl: 'https://acuotas.app'
  };

  const pagueloFacil: IPagueloFacilLinkGenerator = new PagueloFacilLinkGenerator(pagueloFacilOptions, new HexEncoder());
  const whatsapp = new WhatsappLinkGenerator(`Hola, quiero completar el proceso de pago del evento ${event.getTitle()}.`);
  const linkGenerator = new LinkGenerator(pagueloFacil, whatsapp, event, new UnicodeNormalizer());
  const link = await linkGenerator.createPaymentLink();
  paymentBtn.value = new BtnDecorator(link, linkGenerator.getIsFallback(), event)
});

</script>

<template>
  <div v-if="paymentBtn">
    <a :href="paymentBtn.getUrl()"
      class="text-white inline-flex font-bold w-full justify-center bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center"
      :title="paymentBtn.getTitleText()" :aria-label="paymentBtn.getTitleText()">
      {{ paymentBtn.getButtonText() }}
    </a>
  </div>
  <slot name="loader" v-else />
</template>