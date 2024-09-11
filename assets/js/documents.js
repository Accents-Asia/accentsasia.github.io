---
author: Pete
date: 2024-09-011
---
//
// This file is generated by Jekyll and contains all the documents that will be indexed by Lunr.
// This page was last updated at {{ "now" | date: "%Y-%m-%d %H:%M" }}.
//

{% assign beg_smart_quote = "“" -%}
{% assign end_smart_quote = "”" -%}
{% assign double_quote = '"' -%}
{% assign escaped_double_quote = '\"' -%}
{% assign counter = 0 -%}

var documents = [{% for page in site.pages %}{% if page.exclude_search or page.url contains '.xml' or page.url contains 'assets' or page.url contains '404' or page.url contains 'blog' %} {% else %} {
  "id": {{ counter }},
  "url": "{{ site.url }}{{ page.url }}",
  "issue": "{{ page.issue }}",
  "title": "{{ page.title }}",
  "body": "{{ page.content | markdownify | replace: '.', '. ' | strip_html | replace: '`', ' ' | replace: double_quote, ' ' | normalize_whitespace | encode_once }}"{% assign counter = counter | plus: 1 %}
},{% endif %}{% endfor %}{% for page in site.without-plugin %}{
  "id": {{ counter }},
  "url": "{{ site.url }}{{ page.url }}",
  "title": "{{ page.title }}",
  "issue": "{{ page.issue }}",
  "body": "{{ page.content | markdownify | replace: '.', '. ' | strip_html | replace: '`', ' ' | replace: double_quote, ' ' | normalize_whitespace | encode_once }}"{% assign counter = counter | plus: 1 %}
},{% endfor %}{% for page in site.posts %}{
  "id": {{ counter }},
  "url": "{{ site.url }}{{ page.url }}",
  "title": "{{ page.title }}",
  "issue": "{{ page.issue }}",
{%- capture body -%}
{%- for article in page.articles -%}
{{ article.author }} 
{{ article.title }}
{{ article.abstract }}
{%- endfor -%}
{% endcapture %}
  "body": "{{ body | encode_once | normalize_whitespace }}"{% assign counter = counter | plus: 1 %}
} {% if forloop.last %} {% else %}, {% endif %} {% endfor %}];

//console.log("documents: ", documents);

var idx = lunr(function () {
  this.ref('id')
  this.field('title')
  this.field('issue')
  this.field('body')

  documents.forEach(function (doc) {
    this.add(doc)
  }, this)
});