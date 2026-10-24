(function () {
    'use strict'; var STORAGE_KEY = 'citizenCollapsibleSidebarState_v2'; function init() {
         // 覆盖常规侧边栏和抽屉
        var roots = document.querySelectorAll('.citizen-sidebar, .citizen-drawer__menu, #mw-panel, .mw-portlet'); if (!roots.length) return; var state = loadState(); roots.forEach(function (root) {
             // 在根容器内寻找可能的“菜单区块”
             // 不限定 heading 类名，而是找紧邻 <ul> 的块级元素
            var candidates = root.querySelectorAll('div, h2, h3, summary, dt, span'); candidates.forEach(function (el) {
                if (el.dataset.citizenCollapsibleBound) return; var list = el.nextElementSibling; // 关键：只处理后面紧跟着 <ul> 的元素
                if (!list || list.tagName !== 'UL') return; el.dataset.citizenCollapsibleBound = '1'; makeToggle(el, list, state);
            });
        });
    }
    function makeToggle(trigger, list, state) {
        var key =(trigger.id || trigger.textContent.trim().slice(0, 60)).replace( /\s+/g, ' '); if (!key) return; // 恢复状态
        if (state[key] === true) {
            list.style.display = 'none'; trigger.classList.add('citizen-sidebar-collapsed'); trigger.setAttribute('aria-expanded', 'false');
        }
        trigger.classList.add('citizen-sidebar-toggle'); trigger.setAttribute('role', 'button'); trigger.setAttribute('tabindex', '0'); function toggle() {
            var isHidden = list.style.display === 'none'; if (isHidden) {
                list.style.display = ''; trigger.classList.remove('citizen-sidebar-collapsed'); trigger.setAttribute('aria-expanded', 'true'); delete state[key];
            }
            else {
                list.style.display = 'none'; trigger.classList.add('citizen-sidebar-collapsed'); trigger.setAttribute('aria-expanded', 'false'); state[key] = true;
            }
            saveState(state);
        }
        trigger.addEventListener('click', toggle); trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); toggle();
            }
        });
    }
    function loadState() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
            };
        }
        catch (e) {
            return {
            };
        }
    }
    function saveState(state) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
        catch (e) {
        }
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
}
());
