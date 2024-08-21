package com.cardapio.backend.print;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrintController {
    
    @Autowired
    private PrintService printService;

    @GetMapping("/print")
    public String print(@RequestParam String text) {
        printService.printText(text);
        printService.close();
        return "Text sent to printer!";
    }
}
