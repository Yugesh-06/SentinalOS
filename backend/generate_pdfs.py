from fpdf import FPDF
import os

def create_invoice(filename, invoice_number, buyer, buyer_address, origin, destination, item, qty, price):
    pdf = FPDF()
    pdf.add_page()
    
    # Header
    pdf.set_font("Arial", 'B', 24)
    pdf.cell(0, 20, "COMMERCIAL INVOICE", border=False, ln=1, align='C')
    pdf.ln(10)
    
    # Details
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(50, 10, f"INVOICE NO: #{invoice_number}")
    pdf.cell(0, 10, f"DATE: 2026-04-16", ln=1, align='R')
    pdf.ln(10)
    
    # Parties
    pdf.set_font("Arial", '', 12)
    pdf.cell(100, 10, "EXPORTER / ORIGIN:", ln=0)
    pdf.cell(100, 10, "CONSIGNEE / DESTINATION:", ln=1)
    
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(100, 8, "Global Supply Inc.", ln=0)
    pdf.cell(100, 8, buyer, ln=1)
    
    pdf.set_font("Arial", '', 12)
    pdf.cell(100, 8, "Industrial Park 4, Taipei", ln=0)
    pdf.cell(100, 8, buyer_address, ln=1)
    
    pdf.cell(100, 8, f"Country: {origin}", ln=0)
    pdf.cell(100, 8, f"Country: {destination}", ln=1)
    
    pdf.ln(20)
    
    # Table Header
    pdf.set_font("Arial", 'B', 12)
    pdf.cell(100, 10, "ITEM DESCRIPTION", border=1, align='C')
    pdf.cell(30, 10, "QTY", border=1, align='C')
    pdf.cell(60, 10, "DECLARED VALUE", border=1, align='C', ln=1)
    
    # Table Body
    pdf.set_font("Arial", '', 12)
    pdf.cell(100, 20, item, border=1, align='C')
    pdf.cell(30, 20, str(qty), border=1, align='C')
    pdf.cell(60, 20, f"${price:,.2f}", border=1, align='C', ln=1)
    
    pdf.ln(30)
    pdf.set_font("Arial", 'I', 10)
    pdf.cell(0, 10, "Thank you for your business. All goods subject to international trade compliance.", align='C')
    
    pdf.output(filename)

# 3. New Invoice (Agricultural / Perishable - Triggering USDA / Botanical checks)
create_invoice(
    filename="/app/Invoice_Warning_Agriculture.pdf",
    invoice_number="7742",
    buyer="Whole Food Distributions",
    buyer_address="Seattle Port Authority",
    origin="MX",
    destination="US",
    item="Fresh Hass Avocados (Perishable)",
    qty=5000,
    price=95000.00
)

# 4. New Invoice (Standard Construction Material - Should clear instantly)
create_invoice(
    filename="/app/Invoice_Compliant_Steel.pdf",
    invoice_number="1150",
    buyer="Metro Build Group",
    buyer_address="Tokyo Bay Construction",
    origin="KR",
    destination="JP",
    item="Industrial Steel Pipes (Alloy)",
    qty=300,
    price=24000.00
)

print("Generated two additional PDF invoices successfully!")
