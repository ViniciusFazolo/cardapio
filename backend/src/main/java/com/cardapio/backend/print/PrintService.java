package com.cardapio.backend.print;

import org.springframework.stereotype.Service;

import jpos.JposException;
import jpos.POSPrinter;
import jpos.POSPrinterConst;

@Service
public class PrintService {
    
    private POSPrinter printer;

    public PrintService() {
        // Configura o JPOS com o arquivo XML
        printer = new POSPrinter();
        try {
            // Nome lógico do dispositivo conforme definido no jpos.xml
            printer.open("Printer");
            printer.claim(1000); // Timeout de 1 segundo
            printer.setDeviceEnabled(true); // Habilita o dispositivo 
        } catch (JposException e) {
            e.printStackTrace();
        }
    }

    public void printText(String text) {
        try {
            printer.printNormal(POSPrinterConst.PTR_S_RECEIPT, text + "\n"); // Imprime o texto e pula uma linha
        } catch (JposException e) {
            e.printStackTrace();
        }
    }

    public void close() {
        try {
            printer.setDeviceEnabled(false); // Desabilita o dispositivo
            printer.release(); // Libera o dispositivo
            printer.close(); // Fecha o dispositivo
        } catch (JposException e) {
            e.printStackTrace();
        }
    }
}
