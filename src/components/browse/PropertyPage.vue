<template>
  <div>
    <div id="codepoint">
      {{ codepoint }}
    </div>
    <div id="character-box">
      <div id="character-title">Character</div>
      <div id="character">{{ character }}</div>
    </div>
    <div id="character-name">
      {{ name === null ? "Loading ..." : name }}
    </div>
    <div id="properties-box">
      <div id="control-btn-box">
        <router-link
          :to="prevLink"
          tag="button"
          id="btn-left">Left
        </router-link>
        <router-link
          :to="nextLink"
          tag="button"
          id="btn-right">Right
        </router-link>
        <fieldset>
          <legend>Filter</legend>
          <div>
            <input type="checkbox" value="all" id="check-all"
              v-on:change="uncheckOthers()"
              v-model="filter.all">
            <label for="check-all">All</label>
          </div>
          <div>
            <input type="checkbox" value="numeric" id="check-numeric"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.numeric">
            <label for="check-numeric">Numeric</label>
          </div>
          <div>
            <input type="checkbox" value="string" id="check-string"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.string">
            <label for="check-string">String</label>
          </div>
          <div>
            <input type="checkbox" value="misc" id="check-misc"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.misc">
            <label for="check-misc">Miscellaneous</label>
          </div>
          <div>
            <input type="checkbox" value="catalog" id="check-catalog"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.catalog">
            <label for="check-catalog">Catalog</label>
          </div>
          <div>
            <input type="checkbox" value="enumerated" id="check-enumerated"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.enumerated">
            <label for="check-enumerated">Enumerated</label>
          </div>
          <div>
            <input type="checkbox" value="binary" id="check-binary"
              v-bind:class="{ 'checkbox-not-selected': filter.all }"
              v-model="filter.binary">
            <label for="check-binary">Binary</label>
          </div>
        </fieldset>
        <property-page-table v-on:name-fetched="updateName" v-bind:codepoint="codepoint"
            v-bind:filter="filter">
        </property-page-table>
      </div> <!-- control-btn-box -->
    </div>
  </div>
</template>

<script>
import PropertyPageTable from './PropertyPageTable'

export default {
  name: 'property-page',
	template: '#properties-template',
	components: {
		'property-page-table': PropertyPageTable
	},
	props: ['changed'],
	data: function() {
		var cp = CodePoint.fromString(this.$route.params.cp)
		var codepoint = cp.toString(true)
		var character = cp.toCharacter()
		return {
			codepoint: codepoint,
			character: character,
			name: null,

			prevLink: cp.previous().toString(),
			nextLink: cp.next().toString(),
            filter: {
                all: true,
                numeric: false,
                string: false,
                misc: false,
                catalog: false,
                enumerated: false,
                binary: false
            }
		}
	},
	methods: {
		// Called when 'name-fetched' emitted.
		updateName: function(attr) {
			this.name = attr.name
		},

		prevCharacter: function() {
			if (CodePoint.fromString(this.codepoint, true).code > 0) {
				this.moveCharacter(-1)
			}
		},
		nextCharacter: function() {
			if (CodePoint.fromString(this.codepoint, true).code < 0x10FFFF) {
				this.moveCharacter(1)
			}
		},
		moveCharacter: function(offset) {
			// Change current cp.
			var cp = CodePoint.fromString(this.codepoint, true)
			cp = new CodePoint(cp.code + offset)

			this.codepoint = cp.toString(true)
			this.character = cp.toCharacter()
			this.name = null
			this.prevLink = cp.previous().toString()
			this.nextLink = cp.next().toString()
		},
        uncheckOthers: function() {
            console.log('all: ' + this.filter.all)
            if (this.filter.all === true) {
                this.filter.numeric = false
                this.filter.string = false
                this.filter.misc = false
                this.filter.catalog = false
                this.filter.enumerated = false
                this.filter.binary = false
            }
        }
	},
	watch: {
		'$route': function(to, from) {
			var prev = CodePoint.fromString(from.params.cp)
			var curr = CodePoint.fromString(to.params.cp)
			if (curr.code - prev.code < 0) {
				this.prevCharacter()
			} else {
				this.nextCharacter()
			}
		},
        filter: {
            handler: function() {
                if (this.filter.numeric || this.filter.string ||
                        this.filter.misc || this.filter.catalog ||
                        this.filter.enumerated || this.filter.binary) {
                    this.filter.all = false
                }
            },
            deep: true
        }
	}
}
</script>
