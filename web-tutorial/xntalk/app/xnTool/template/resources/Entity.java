{{ hello }}

It's currently {% now | date_format: "yyyy-MM-dd 'at' HH:mm:ss" %}

Nested variable: {{ foo.bar }}

foreach 循环
{% for dude in guys %}
Current dude is {{ dude | uppercase }}...{% if dude == "matt" %} AWESOME!{% endif %}
{% if currentLoop.currentIndex == 0 %}
(the best!) {% comment %} Should only happen for Matt {% /comment %}
{% for 1 to 5 %}*{% endfor %}
{% endif %}
{% endfor %}

Last of the {{ guys.@count }} guys was {{ guys.@lastObject | pascalcased }}

表达式，标记语言 Markers look like {{ engine.delimiters.markerStart }} this {{ engine.delimiters.markerEnd }}
Variables look like {{ engine.delimiters.expressionStart }} this {{ engine.delimiters.expressionEnd }}
Filter delimiter is {{ engine.delimiters.filter }}

We also know about {{ YES }} and {{ NO }} or {{ true }} and {{ false }}

Is 1 less than 2? {% if 1 < 2 %} Yes! {% else %} No? {% endif %}

{% literal %}This text won't be {% now %} interpreted.{% /literal %}
For循环
{% for 1 to 5 %}{{ currentLoop.currentIndex }}{%if currentLoop.currentIndex % 2%}[ODD] {%else%}[EVEN] {%endif%}{% endfor %}
相反的排序
{% for 1 to 5 reversed %}{{ currentLoop.currentIndex }}{% cycle "[odd] " "[even] " %}{% endfor %}

And we're done.

{{ setting.Developer }}
{{ setting.CompanyName }}
{{ setting.CompanyCode }}

table name: {{ table.name }}
table schema: {{ table.schema }}
table meaning:{{ table.meaning }}
table description:{{ table.description }}
table isTenant:{{ table.isTenant }}

字段列表
{% for column in table.columns %}
Current column is {{ column.name | uppercase }} | {{ column.java }}| {{ column.isRequired }} | {{ column.type }}  | {{ column.meaning }}
{% endfor %}





