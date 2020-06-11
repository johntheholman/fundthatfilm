<?php

if(!function_exists(('handle_error'))){
    function handle_error($error_object){
        print(json_encode(['success' => false, 'error' => "
            message: {$error_object -> getMessage()},
            file: {$error_object -> getFile()},
            line: {$error_object -> getLine()}
        "]));
    }
    set_exception_handler('handle_error');
}


?>