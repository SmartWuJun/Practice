CREATE TABLE `{{ table.name | uppercase }}` ({% for column in table.columnsAll %}
    `{{ column.name | uppercase }}` {{ column.mysqlDataType  }}  {{ column.defaultNull  }}  COMMENT '{{ column.meaning  }}',{% endfor %}
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='{{ table.meaning}}';