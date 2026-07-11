from io import BytesIO

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.lib.styles import getSampleStyleSheet


def generate_fleet_report(summary):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4
    )

    styles = getSampleStyleSheet()

    story = []

    title = Paragraph(
        "<b>AeroGuard Fleet Health Report</b>",
        styles["Title"]
    )

    story.append(title)
    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "Fleet Health Summary",
            styles["Heading2"]
        )
    )

    story.append(Spacer(1, 10))

    table_data = [

        ["Metric", "Value"],

        ["Total Engines", summary["total_engines"]],

        ["Healthy", summary["healthy"]],

        ["Warning", summary["warning"]],

        ["Critical", summary["critical"]],

        ["Average RUL", summary["avg_rul"]]

    ]

    table = Table(table_data)

    table.setStyle(

        TableStyle([

            ("BACKGROUND", (0, 0), (-1, 0), HexColor("#00F5D4")),

            ("TEXTCOLOR", (0, 0), (-1, 0), HexColor("#04151F")),

            ("GRID", (0, 0), (-1, -1), 1, HexColor("#0B556B")),

            ("BACKGROUND", (0, 1), (-1, -1), HexColor("#F5F5F5")),

            ("BOTTOMPADDING", (0, 0), (-1, 0), 12),

            ("ALIGN", (0, 0), (-1, -1), "CENTER"),

        ])

    )

    story.append(table)

    story.append(Spacer(1, 30))

    story.append(

        Paragraph(

            "Generated automatically by AeroGuard Predictive Maintenance System.",

            styles["Normal"]

        )

    )

    doc.build(story)

    buffer.seek(0)

    return buffer


def generate_sensor_report(summary):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer, pagesize=A4)

    styles = getSampleStyleSheet()

    story = []

    story.append(
        Paragraph(
            "<b>AeroGuard Sensor Analysis Report</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1, 20))

    story.append(
        Paragraph(
            "Sensor Health Summary",
            styles["Heading2"]
        )
    )

    story.append(Spacer(1, 10))

    data = [

        ["Metric", "Value"],

        ["Healthy Engines", summary["healthy"]],

        ["Warning Engines", summary["warning"]],

        ["Critical Engines", summary["critical"]],

        ["Average RUL", summary["avg_rul"]],

    ]

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),HexColor("#00F5D4")),
        ("TEXTCOLOR",(0,0),(-1,0),HexColor("#04151F")),
        ("GRID",(0,0),(-1,-1),1,HexColor("#0B556B")),
        ("BACKGROUND",(0,1),(-1,-1),HexColor("#F5F5F5")),
        ("ALIGN",(0,0),(-1,-1),"CENTER"),
    ]))

    story.append(table)

    doc.build(story)

    buffer.seek(0)

    return buffer


def generate_maintenance_report(summary):

    buffer = BytesIO()

    doc = SimpleDocTemplate(buffer,pagesize=A4)

    styles = getSampleStyleSheet()

    story=[]

    story.append(
        Paragraph(
            "<b>AeroGuard Maintenance Report</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1,20))

    story.append(

        Paragraph(

            f"""
            <b>Critical Engines:</b> {summary["critical"]}<br/><br/>
            <b>Warning Engines:</b> {summary["warning"]}<br/><br/>
            Immediate maintenance is recommended for all critical engines.
            """,

            styles["BodyText"]

        )

    )

    doc.build(story)

    buffer.seek(0)

    return buffer


def generate_engine_report(summary):

    buffer=BytesIO()

    doc=SimpleDocTemplate(buffer,pagesize=A4)

    styles=getSampleStyleSheet()

    story=[]

    story.append(
        Paragraph(
            "<b>Engine Performance Report</b>",
            styles["Title"]
        )
    )

    story.append(Spacer(1,20))

    story.append(

        Paragraph(

            f"""
            Fleet Engines: {summary["total_engines"]}<br/><br/>
            Average Remaining Useful Life: {summary["avg_rul"]}<br/><br/>
            Fleet Health Overview Generated Successfully.
            """,

            styles["BodyText"]

        )

    )

    doc.build(story)

    buffer.seek(0)

    return buffer