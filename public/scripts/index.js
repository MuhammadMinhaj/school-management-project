import menu_pages from './admin/menuAndPages'
import dropDown from './admin/dropDown'
// Admin Panel Setting Menu Toggler
import { Short } from '../../utils/scriptsShoctCode/sorthCodeClass'
let { $,toggler, } = new Short

toggler($('.setting'),$('.setting-menu'))
