package com.ssafy.pennypal.domain.card.controller;


import com.ssafy.pennypal.domain.card.dto.response.CardResponse;
import com.ssafy.pennypal.domain.card.service.CardService;
import com.ssafy.pennypal.global.common.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("api/card")
@RestController
public class CardController {
    private final CardService cardService;

    @GetMapping
    public ApiResponse<List<CardResponse>> getCards() {
        return cardService.getCards();
    }
}