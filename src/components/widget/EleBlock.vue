
<template>
  <div class="block" :class="['complex-control-' + field.extraParams.length]">
    <!-- <ele-select-area
      v-if="field.elementCode === 'selectArea'"
      :selectAreaData="field.extraParams"
      :domainObject="domainObject"
      :isList="isList"
      :editable="editable">
    </ele-select-area>
    <ele-quote
      v-else-if="field.elementCode === 'quoteType'"
      :quoteData="field.extraParams"
      :domainObject="domainObject"
      :isList="isList"
      :editable="editable">
    </ele-quote>
    <ele-goods-loss
      v-else-if="field.elementCode === 'goodsLossType'"
      :quoteData="field.extraParams"
      :domainObject="domainObject"
      :isList="isList"
      :editable="editable">
    </ele-goods-loss>
    <ele-info-fee
      v-else-if="field.elementCode === 'infoFee'"
      :quoteData="field.extraParams"
      :domainObject="domainObject"
      :isList="isList"
      :editable="editable">
    </ele-info-fee>
    <ele-tag-select
      v-else-if="field.elementCode === 'tagSelect'"
      :tagData="field.extraParams"
      :domainObject="domainObject"
      :isList="isList"
      :editable="editable">
    </ele-tag-select>
    <ele-select-driver
      v-else-if="field.elementCode === 'listDriver'"
      :domainObject="domainObject"
      :driverData="field.extraParams[0]"
      :isList="isList"
      :editable="editable">
    </ele-select-driver>
    <ele-select-viceDriver
      v-else-if="field.elementCode === 'listViceDriver'"
      :domainObject="domainObject"
      :driverData="field.extraParams[0]"
      :isList="isList"
      :editable="editable">
    </ele-select-viceDriver>
    <ele-select-trailerTruck
      v-else-if="field.elementCode === 'listTrailerTruck'"
      :domainObject="domainObject"
      :isList="isList"
      :truckData="field.extraParams[0]"
      :editable="editable">
    </ele-select-trailerTruck> -->
    <ele-config 
      :domainObject="domainObject"
      :field="param"
      :inputKey="inputKey"
      :editable="editable"
      :isList="isList"
      :uploadUrl="uploadUrl"
      v-for="param in field.extraParams"
      :key="param.field"></ele-config>
  </div>
</template>

<script type="text/ecmascript-6">
  import eleConfig from './EleConfig.vue';
//   import eleSelectArea from '../ele-select-area/eleSelectArea.vue';
//   import eleQuote from '../ele-quote/eleQuote.vue';
//   import eleGoodsLoss from '../ele-goods-loss/eleGoodsLoss.vue';
//   import eleInfoFee from '../ele-info-fee/eleInfoFee.vue';
//   import eleSelectDriver from '../ele-select-driver/eleSelectDriver.vue';
//   import eleSelectViceDriver from '../ele-select-viceDriver/eleSelectViceDriver.vue';
//   import eleSelectTrailerTruck from '../ele-select-trailerTruck/eleSelectTrailerTruck.vue';
//   import eleTagSelect from '../ele-tag-select/eleTagSelect.vue';

  export default {
    name: 'eleBlock',
    // inject: ['eventBus'],
    props: {
      field: Object,
      domainObject: Object,
      uploadUrl: String,
      editable: {
        type: Boolean,
        'default': true
      },
      isList: {
        type: Boolean,
        'default': false
      },
      inputKey: Array
    },
    data() {
      return {
      };
    },
    components: {
      'ele-config': eleConfig,
    //   'ele-select-area': eleSelectArea,
    //   'ele-quote': eleQuote,
    //   'ele-tag-select': eleTagSelect,
    //   'ele-select-viceDriver': eleSelectViceDriver,
    //   'ele-select-trailerTruck': eleSelectTrailerTruck,
    //   'ele-goods-loss': eleGoodsLoss,
    //   'ele-info-fee': eleInfoFee,
    //   eleSelectDriver
    },
    methods: {
    //   form() {
    //     let parent = this.$parent;
    //     if (parent) {
    //       while (parent && parent.$options && parent.$options.componentName !== 'eleForm') {
    //         parent = parent.$parent;
    //       }
    //       return parent;
    //     }
    //     return null;
    //   }
    },
    mounted() {
//      console.log('inject eventBus', this.eventBus);
//       if (this.field.event && this.eventBus && !this.isList) {
//         let event = this.field.event;
//         event = event.replace(new RegExp('field1', 'g'), '_ele1');
//         event = event.replace(new RegExp('field2', 'g'), '_ele2');
//         event = event.replace(new RegExp('field3', 'g'), '_ele3');
//         console.log('property', this.field.fieldConfigCode, 'event', this.field.event, 'exp', event);

//         /* eslint-disable no-new-func */
//         const ele1 = this.eventBus.getElementByField(this.field.extraParams[0].field),
//           ele2 = this.eventBus.getElementByField(this.field.extraParams[1].field),
//           ele3 = this.eventBus.getElementByField(this.field.extraParams[2].field),
//           listenerDefine = new Function('_ele1', '_ele2', '_ele3', event);
// //          console.log(this.field.extraParams[0].field, ele1, this.field.extraParams[1].field, ele2, this.field.extraParams[2].field, ele3);
//         listenerDefine(ele1, ele2, ele3);
    //   }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
