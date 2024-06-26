package com.ssafy.pennypal.global.common.exception;

import com.ssafy.pennypal.domain.team.exception.AlreadyAppliedJoinException;
import com.ssafy.pennypal.domain.team.exception.BannedMemberJoinException;
import com.ssafy.pennypal.global.common.api.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ApiControllerAdvice {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BindException.class)
    public ApiResponse<Object> bindException(BindException e) {
        return ApiResponse.of(
                HttpStatus.BAD_REQUEST,
                e.getBindingResult().getAllErrors().get(0).getDefaultMessage(),
                null
        );
    }

    @ExceptionHandler(BannedMemberJoinException.class)
    public ApiResponse<Object> handleBannedMemberJoinException(BannedMemberJoinException ex) {
        return ApiResponse.of(HttpStatus.UNAUTHORIZED ,
                ex.getMessage(),
                null);
    }

    @ExceptionHandler(AlreadyAppliedJoinException.class)
    public ApiResponse<Object> handleAlreadyAppliedJoinException(AlreadyAppliedJoinException ex) {
        return ApiResponse.of(HttpStatus.CONFLICT,
                ex.getMessage(),
                null);
    }

}