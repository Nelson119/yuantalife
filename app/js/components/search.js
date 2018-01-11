'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations*/
/*global app, TweenMax*/
app.partial.search = function($, container){
    var originalList = $('.search-result', container);
    var pages = [];
    var opt = $('.search-result', container).data(); 
    var list = $('.search-result table tr:gt(0)', container);
	container.on('page:update' , function(page, menu){
        container.addClass('loaded');
        var tab = newPage();
        list.each(function(i, tr){
            if(i % opt.pageSize == 0 && i != 0){
                pages.push(tab);
                tab = newPage();
            }
            tab.append(tr);
        });
        if(tab){
            pages.push(tab);
        }
        $('.goto option', container).remove();
        for(var i = 1;i<=pages.length;i++){
            var option = document.createElement('option');
            option.value = i;
            option.innerHTML = i;
            $('.goto', container).append(option);
        }
        goto();



        $('.next.btn', container).on('click', next);
        $('.prev.btn', container).on('click', prev);
        $('.first.btn', container).on('click', first);
        $('.last.btn', container).on('click', last);
        $('.goto', container).on('input change', function(){
            $('.search-result', container).data('current-page', this.value);
            goto();
        });
    });
    function newPage(){
        var tab = originalList.clone();
        $('table tr:gt(0)', tab).remove();
        return $('table', tab);
    }

    function next(e){
        opt = $('.search-result', container).data(); 
        if(opt.currentPage == pages.length){
            alert('已經是最後一頁');
            return;
        }
        $('.search-result', container).data('current-page', opt.currentPage + 1);
        goto();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function prev(e){
        opt = $('.search-result', container).data(); 
        if(opt.currentPage == 1){
            alert('已經是第一頁');
            return;
        }
        $('.search-result', container).data('current-page', opt.currentPage - 1);
        goto();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function first(e){
        $('.search-result', container).data('current-page', 1);
        goto();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function last(e){
        $('.search-result', container).data('current-page', pages.length);
        goto();
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    function goto(idx){
        opt = $('.search-result', container).data(); 
        $('.search-result').html(pages[opt.currentPage - 1]);
        $('.goto', container).each(function(){
            $('option', this).eq(opt.currentPage - 1)[0].selected = true;
        });
    }
};
