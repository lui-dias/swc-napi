#![deny(clippy::all)]

use deno_ast::parse_module;
use deno_ast::swc::common::comments::Comment;
use deno_ast::swc::parser::Syntax::Typescript;
use deno_ast::swc::parser::TsConfig;
use deno_ast::MediaType;
use deno_ast::ParseParams;
use deno_ast::SourceTextInfo;
use napi::bindgen_prelude::Array;
use napi::Env;

#[macro_use]
extern crate napi_derive;

#[napi]
pub fn sum(a: i32, b: i32) -> i32 {
  a + b
}

#[napi(object)]
pub struct MyStruct {
  pub program: String,
  pub comments: Array,
}

#[napi(object)]
pub struct TheComment {
  pub text: String,
  pub span_lo: u32,
  pub span_hi: u32,
}

#[napi]
pub fn parse_sync(s: String, env: Env) -> MyStruct {
  let text_info = SourceTextInfo::new(s.into());
  let parsed_source = parse_module(ParseParams {
    specifier: "file:///my_file.ts".to_string(),
    media_type: MediaType::TypeScript,
    text_info,
    capture_tokens: true,
    maybe_syntax: Some(Typescript(TsConfig {
      tsx: true,
      ..Default::default()
    })),
    scope_analysis: false,
  })
  .expect("should parse");

  let comments = parsed_source.comments().get_vec();

  let mut arr = env.create_array(comments.len() as u32).unwrap();

  for comment in comments {
    let the_comment = TheComment {
      text: comment.text.to_string(),
      span_lo: comment.span.lo.0,
      span_hi: comment.span.hi.0,
    };

    arr.insert(the_comment).unwrap();
  }

  return MyStruct {
    program: serde_json::to_string(parsed_source.program_ref()).unwrap(),
    comments: arr,
  };

}
