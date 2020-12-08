import Vue from 'vue'

import { AlertPlugin } from 'bootstrap-vue'
Vue.use(AlertPlugin)
import { ButtonPlugin } from 'bootstrap-vue'
Vue.use(ButtonPlugin)
import { FormCheckboxPlugin } from 'bootstrap-vue'
Vue.use(FormCheckboxPlugin)
import { FormDatepickerPlugin } from 'bootstrap-vue'
Vue.use(FormDatepickerPlugin)
import { FormFilePlugin } from 'bootstrap-vue'
Vue.use(FormFilePlugin)
Vue.use({FormFilePlugin, BFormFile: { browseText: "Öffnen" }})
import { FormGroupPlugin } from 'bootstrap-vue'
Vue.use(FormGroupPlugin)
import { FormInputPlugin } from 'bootstrap-vue'
Vue.use(FormInputPlugin)
import { FormRadioPlugin } from 'bootstrap-vue'
Vue.use(FormRadioPlugin)
import { FormTextareaPlugin } from 'bootstrap-vue'
Vue.use(FormTextareaPlugin)
import { LayoutPlugin } from 'bootstrap-vue'
Vue.use(LayoutPlugin)
import { NavbarPlugin } from 'bootstrap-vue'
Vue.use(NavbarPlugin)
import { PopoverPlugin } from 'bootstrap-vue'
Vue.use(PopoverPlugin)
import { TooltipPlugin } from 'bootstrap-vue'
Vue.use(TooltipPlugin)

import { BFormDatalist } from 'bootstrap-vue'
Vue.component('b-form-datalist', BFormDatalist)

import {BIcon, BIconEye, BIconEyeSlash, BIconCaretDownFill, BIconCaretRightFill, BIconX, BIconPlus, BIconCloudUpload} from 'bootstrap-vue'
Vue.component('BIcon', BIcon)
Vue.component('BIconEye', BIconEye)
Vue.component('BIconEyeSlash', BIconEyeSlash)
Vue.component('BIconCaretDownFill', BIconCaretDownFill)
Vue.component('BIconCaretRightFill', BIconCaretRightFill)
Vue.component('BIconX', BIconX)
Vue.component('BIconPlus', BIconPlus)
Vue.component('BIconCloudUpload', BIconCloudUpload)

