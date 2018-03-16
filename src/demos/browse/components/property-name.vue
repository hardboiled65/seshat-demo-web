<template>
  <td>{{ full + ' (' + alias + ')' }}</td>
</template>

<script>
import propertyNames from '../../../property_names'

export default {
    props: ['api-name'],
    computed: {
        full: function() {
            return propertyNames[this.apiName].full
        },
        alias: function() {
            return propertyNames[this.apiName].alias
        }
    }
}
</script>
